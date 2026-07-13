from enum import Enum
from pydantic import BaseModel
from datetime import datetime, date

class RelationshipType(str, Enum):
	FOLLOWER = "follower"
	FOLLOWING = "following"
	CLOSE_FRIEND = "close_friend"
	BLOCKED = "blocked"
	RESTRICTED = "restricted"
	PENDING_SENT = "pending_sent"
	PENDING_RECEIVED = "pending_received"

class ActivityType(Enum):
	LIKE = "like"
	COMMENT = "comment"
	SAVE = "save"
	STORY_REACTION = "story_reaction"
	SEARCH = "search"

class MediaType(Enum):
	PHOTO = "photo"
	VIDEO = "video"
	REEL = "reel"
	STORY = "story"