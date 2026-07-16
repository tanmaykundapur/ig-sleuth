from .connections import ConnectionsAnalysisResult
from .profile import ProfileInfo
from pydantic import BaseModel

class AnalyzeResponse(BaseModel):
    connections: ConnectionsAnalysisResult
    profile: ProfileInfo