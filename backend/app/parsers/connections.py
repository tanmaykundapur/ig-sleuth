import json
from datetime import datetime
from ..models.connections import Relationship, ConnectionsSnapshot
from ..models.common import RelationshipType

def parse_connections(raw_followers: list[dict], raw_following: list[dict], raw_close_friends: list[dict] | None = None) -> ConnectionsSnapshot:
    relationships = []

    # Loop through followers
    for follower in raw_followers:
        string_data = follower.get("string_list_data")
        if string_data:
            first_dict = string_data[0]
            username = first_dict.get("value")
            profile_url = first_dict.get("href")
            timestamp = first_dict.get("timestamp")
            relationship_type = RelationshipType.FOLLOWER
            relationships.append(Relationship(username=username, profile_url=profile_url, timestamp=timestamp, relationship_type=relationship_type))

    # Loop through following
    for following in raw_following:
        username = following.get("title") or ""
        string_data = following.get("string_list_data")
        if string_data:
            first_dict = string_data[0]
            profile_url = first_dict.get("href")
            timestamp = first_dict.get("timestamp")
            relationship_type = RelationshipType.FOLLOWING
            relationships.append(Relationship(username=username, profile_url=profile_url, timestamp=timestamp, relationship_type=relationship_type))
    
    # Loop through Close Friends
    if raw_close_friends:
        for close_friend in raw_close_friends:
            string_data = close_friend.get("string_list_data")
            if string_data:
                first_dict = string_data[0]
                username = first_dict.get("value")
                profile_url = first_dict.get("href")
                timestamp = first_dict.get("timestamp")
                relationship_type = RelationshipType.CLOSE_FRIEND
                relationships.append(Relationship(username=username, profile_url=profile_url, timestamp=timestamp, relationship_type=relationship_type))
    
    captured_at = datetime.now()
    snapshot = ConnectionsSnapshot(captured_at=captured_at, relationships=relationships)

    return snapshot
    
