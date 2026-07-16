from typing import Literal
from ..models.connections import ConnectionsSnapshot, Relationship, RelationshipType, ConnectionsDiff
from collections import defaultdict



# ANALYSIS FUNCTIONS =================================================================
# Return list of mutuals
def mutuals(rels : dict[str, list[Relationship]]) -> set[str]:
    mutuals_list = set()
    for key, item_list in rels.items():
        if hasFollower(item_list) and hasFollowing(item_list):
            mutuals_list.add(key)
    return mutuals_list

# Return list of users that do not follow you back
def not_following_back(rels : dict[str, list[Relationship]]) -> set[str]:
    not_following_back_list = set()
    for key, item_list in rels.items():
        if not hasFollower(item_list) and hasFollowing(item_list):
            not_following_back_list.add(key)
    return not_following_back_list

# Return list of users YOU don't follow back
def not_following_back_by_you(rels : dict[str, list[Relationship]]) -> set[str]:
    not_following_back_by_you_list = set()
    for key, item_list in rels.items():
        if hasFollower(item_list) and not hasFollowing(item_list):
            not_following_back_by_you_list.add(key)
    return not_following_back_by_you_list

# Return list of who followed first: you or them
def followed_first(rels: dict[str, list[Relationship]]) -> dict[str, Literal["you", "them", "same_time"]]:
    mutual_usernames = mutuals(rels)
    result = {}
    for username in mutual_usernames:
        # pull the FOLLOWER and FOLLOWING rows for this username out of rels[username]
        # compare their .since values, assign "you" or "them"
        follower_rel = get_relationship(rels[username], RelationshipType.FOLLOWER) # when THEY followed you
        following_rel = get_relationship(rels[username], RelationshipType.FOLLOWING) # when YOU followed

        # Edge case: Relationship not Found or timestamp not given (shouldn't happen)
        if follower_rel is None or following_rel is None:
            continue
        if follower_rel.timestamp is None or following_rel.timestamp is None:
            continue

        # if you followed them first
        if following_rel.timestamp < follower_rel.timestamp:
            result[username] = "you"
        # Edge case: (shouldn't happen)
        elif following_rel.timestamp == follower_rel.timestamp:
            result[username] = "same_time"
         # they followed you first
        else:
            result[username] = "them"

    return result

def diff_snapshots(old : ConnectionsSnapshot, new : ConnectionsSnapshot) -> ConnectionsDiff:
    old_set = to_identity_set(old)
    new_set = to_identity_set(new)

    gained = new_set - old_set
    lost = old_set - new_set

    new_followers = []
    lost_followers = []
    new_following = []
    lost_following = []

    for x in gained:
        if x[1] == RelationshipType.FOLLOWER:
            new_followers.append(x)
        else:
            new_following.append(x)

    for x in lost:
        if x[1] == RelationshipType.FOLLOWING:
            lost_followers.append(x)
        else:
            lost_following.append(x)

    return ConnectionsDiff(new_followers=new_followers, lost_followers=lost_followers, new_following=new_following, lost_following=lost_following)

# HELPER FUNCTIONS ==================================================================
def hasFollower(rel: list) -> bool:
    for x in rel:
        if x.relationship_type == RelationshipType.FOLLOWER:
            return True   
    return False

def hasFollowing(rel: list) -> bool:
    for x in rel:
        if x.relationship_type == RelationshipType.FOLLOWING:
            return True
    return False

# Returns relationship by relationship type
def get_relationship(rels_for_user: list[Relationship], rel_type: RelationshipType) -> Relationship | None:
    for rel in rels_for_user:
        if rel.relationship_type == rel_type:
            return rel
    return None

# Groups Relationship list by username
def group_by_username(snapshot: ConnectionsSnapshot) -> dict[str, list[Relationship]]:
    relationships = defaultdict(list)
    for rel in snapshot.relationships:
        relationships[rel.username].append(rel)

    return relationships


def to_identity_set(snapshot: ConnectionsSnapshot) -> set[tuple[str, RelationshipType]]:
    x = set()
    for rel in snapshot.relationships:
        x.add([rel.username, rel.relationship_type])
    return x