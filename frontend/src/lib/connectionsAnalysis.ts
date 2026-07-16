import type { ConnectionsAnalysisResult, MutualTimeline } from "./types";

export function buildMutualTimelines(
    connections: ConnectionsAnalysisResult,
): MutualTimeline[] {
    const timelines: MutualTimeline[] = [];

    for (const username of connections.mutuals) {
        const followingRel = connections.snapshot.relationships.find(
            (r) =>
                r.username === username && r.relationship_type === "following",
        );
        const followerRel = connections.snapshot.relationships.find(
            (r) =>
                r.username === username && r.relationship_type === "follower",
        );

        if (!followingRel?.timestamp || !followerRel?.timestamp) continue;

        const date1 = new Date(followingRel.timestamp);
        const date2 = new Date(followerRel.timestamp);

        const diffInMs = Math.abs(date1.getTime() - date2.getTime());
        const msInDay = 24 * 60 * 60 * 1000;
        const gapDays = Math.floor(diffInMs / msInDay);

        const timeline: MutualTimeline = {
            username: username,
            followedThemSince: followingRel.timestamp,
            followedYouSince: followerRel.timestamp,
            gapDays: gapDays,
            followedFirst: connections.followed_first[username],
        };
        timelines.push(timeline);
    }
    return timelines.sort((a, b) => b.gapDays - a.gapDays);
}
