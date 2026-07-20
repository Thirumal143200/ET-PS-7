from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, decode_token, oauth2_scheme, verify_password
from app.db.session import get_db
from app.models.cni_models import AuditLog, SessionModel, User
from app.schemas.cni_schemas import LoginRequest, Token, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=Token)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.username).first()
    if not user:
        user = db.query(User).filter(User.username == request.username).first()

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user account")

    access_token = create_access_token(subject=user.email, role=user.role)

    session_record = SessionModel(
        session_token=access_token,
        user_id=user.id,
        expires_at=datetime.now(timezone.utc) + timedelta(hours=8),
    )
    db.add(session_record)

    audit = AuditLog(
        user_id=user.id,
        action="USER_LOGIN",
        details=f"User {user.email} logged in with role {user.role}.",
    )
    db.add(audit)
    db.commit()

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_info": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "role": user.role,
            "department": user.department,
            "mfa_enabled": user.mfa_enabled,
        },
    }


@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    user_email = payload.get("sub")
    user = db.query(User).filter(User.email == user_email).first()
    if user:
        db.query(SessionModel).filter(SessionModel.user_id == user.id).delete()
        audit = AuditLog(
            user_id=user.id,
            action="USER_LOGOUT",
            details=f"User {user.email} logged out.",
        )
        db.add(audit)
        db.commit()
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    user_email = payload.get("sub")
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
