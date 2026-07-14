export type RelationshipType =
    | "follower"
    | "following"
    | "close_friend"
    | "blocked"
    | "restricted"
    | "pending_sent"
    | "pending_received";

export interface Relationship {
    username: string;
    profile_url: string;
    timestamp: string | null; // ISO date string over the wire, not a Date object
    relationship_type: RelationshipType;
}

export interface ConnectionsSnapshot {
    captured_at: string;
    relationships: Relationship[];
}

export type FollowedFirst = "you" | "them" | "same_time";

export interface ConnectionsAnalysisResult {
    snapshot: ConnectionsSnapshot;
    mutuals: string[];
    not_following_back: string[];
    not_followed_back_by_you: string[];
    followed_first: Record<string, FollowedFirst>;
}
