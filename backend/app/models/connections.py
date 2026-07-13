from .common import RelationshipType
from enum import Enum
from pydantic import BaseModel
from datetime import datetime, date
from typing import Literal

class Relationship(BaseModel):
    username: str
    profile_url: str
    timestamp: datetime | None = None
    relationship_type: RelationshipType

class ConnectionsSnapshot(BaseModel):
    captured_at: datetime
    relationships: list[Relationship]

class ConnectionsDiff(BaseModel):
    new_followers: list[str]
    lost_followers: list[str]
    new_following: list[str]
    lost_following: list[str]

class ConnectionsAnalysisResult(BaseModel):
    snapshot: ConnectionsSnapshot
    mutuals: list[str]
    not_following_back: list[str]
    not_followed_back_by_you: list[str]
    followed_first: dict[str, Literal["you", "them", "same_time"]]
