from fastapi import APIRouter

from app.ai.agents import agent_orchestrator
from app.schemas.cni_schemas import AgentChatRequest, AgentChatResponse

router = APIRouter(prefix="/agents", tags=["AI Agents & RAG"])


@router.post("/chat", response_model=AgentChatResponse)
def query_ai_agent(request: AgentChatRequest):
    result = agent_orchestrator.query_agent(agent_type=request.agent_type, query=request.query)
    return result
