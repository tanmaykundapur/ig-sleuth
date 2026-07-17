import json
from datetime import datetime
from ..models.connections import Relationship, ConnectionsSnapshot
from ..models.common import RelationshipType

def unwrap_entries(raw_files: list[dict] | None) -> list[dict]:
    entries = []
    if not raw_files:
        return entries

    for file_data in raw_files:
        if isinstance(file_data, dict):
            for key, value in file_data.items():
                if isinstance(value, list):
                    entries.extend(value)
        elif isinstance(file_data, list):
            entries.extend(file_data)
    return entries

def parse_connections(raw_followers: list[dict], raw_following: list[dict], raw_close_friends: list[dict] | None = None) -> ConnectionsSnapshot:
    followers = unwrap_entries(raw_followers)
    following = unwrap_entries(raw_following)
    close_friends = unwrap_entries(raw_close_friends)

    relationships = []

    # Loop through followers
    for follower in followers:
        string_data = follower.get("string_list_data")
        if string_data:
            first_dict = string_data[0]
            username = first_dict.get("value")
            profile_url = first_dict.get("href")
            timestamp = first_dict.get("timestamp")
            relationship_type = RelationshipType.FOLLOWER
            relationships.append(Relationship(username=username, profile_url=profile_url, timestamp=timestamp, relationship_type=relationship_type))

    # Loop through following
    for following in following:
        username = following.get("title") or ""
        string_data = following.get("string_list_data")
        if string_data:
            first_dict = string_data[0]
            profile_url = first_dict.get("href")
            timestamp = first_dict.get("timestamp")
            relationship_type = RelationshipType.FOLLOWING
            relationships.append(Relationship(username=username, profile_url=profile_url, timestamp=timestamp, relationship_type=relationship_type))
    
    # Loop through Close Friends
    if close_friends:
        for close_friend in close_friends:
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
    
