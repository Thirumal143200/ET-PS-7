# Deployment Topology Diagram

```mermaid
graph TD
    subgraph ClientHost [Client Workstation]
        Browser[Modern Web Browser (Chrome/Firefox)]
    end

    subgraph DockerContainerHost [Production Docker Container Environment]
        subgraph NginxContainer [Container: cni_cyber_frontend]
            NGINX[NGINX Web Server (Port 3000 -> 80)]
            StaticDist[React Static Bundle]
        end

        subgraph BackendContainer [Container: cni_cyber_backend]
            Uvicorn[Uvicorn ASGI Server (Port 8000)]
            FastAPIApp[FastAPI Python App]
            MLModels[In-Memory Isolation Forest & AutoEncoder]
            LangChainAgent[LangChain Multi-Agent Engine]
            ChromaStore[ChromaDB Vectorstore Engine]
        end

        subgraph DatabaseContainer [Container: cni_postgres_db]
            PostgresDB[(PostgreSQL 15 Container)]
        end
    end

    Browser -->|HTTP Port 3000| NGINX
    NGINX -->|Serves React Bundle| Browser
    Browser -->|API Calls Port 8000| Uvicorn
    Uvicorn --> FastAPIApp
    FastAPIApp --> MLModels
    FastAPIApp --> LangChainAgent
    LangChainAgent --> ChromaStore
    FastAPIApp -->|SQLAlchemy ORM| PostgresDB
```
