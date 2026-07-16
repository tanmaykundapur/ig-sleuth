import { useState } from "react";
import { buildMutualTimelines } from "../lib/connectionsAnalysis";
import type { AnalyzeResponse } from "../lib/types";
import ConnectionsListCard from "./ConnectionsListCard";
import ExportInstructions from "./ExportInstructions";
import FollowFirstLeaderboard from "./FollowFirstLeaderboard";
import StatsOverview from "./StatsOverview";
import UploadForm from "./UploadForm";

export default function Dashboard() {
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    if (result) {
        return (
            <div className="flex flex-col gap-8">
                <button
                    onClick={() => setResult(null)}
                    className="self-start text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    ← Analyze another export
                </button>
                <DashboardContent result={result} />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <UploadForm
                onResult={setResult}
                onLoadingChange={setIsLoading}
                onError={setError}
            />
            {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
            {error && (
                <p className="text-sm text-red-600 font-medium">
                    Something went wrong.
                </p>
            )}
            <ExportInstructions />
        </div>
    );
}

function DashboardContent({ result }: { result: AnalyzeResponse }) {
    const profileUrlByUsername: Record<string, string> = {};
    for (const rel of result.connections.snapshot.relationships) {
        profileUrlByUsername[rel.username] = rel.profile_url;
    }

    const profileInfo = result.profile;
    const totalFollowing = result.connections.snapshot.relationships.filter(
        (r) => r.relationship_type === "following",
    ).length;

    const totalFollowers = result.connections.snapshot.relationships.filter(
        (r) => r.relationship_type === "follower",
    ).length;

    const mutualCount = result.connections.mutuals.length;
    const notFollowingBackCount = result.connections.not_following_back.length;
    const notFollowedBackByYouCount =
        result.connections.not_followed_back_by_you.length;

    const mutualTimelines = buildMutualTimelines(result.connections);

    return (
        <div className="w-full flex flex-col gap-8">
            <StatsOverview
                profileInfo={profileInfo}
                totalFollowing={totalFollowing}
                totalFollowers={totalFollowers}
                mutualCount={mutualCount}
                notFollowingBackCount={notFollowingBackCount}
                notFollowedBackByYouCount={notFollowedBackByYouCount}
            />

            <ConnectionsListCard
                notFollowingBack={result.connections.not_following_back}
                notFollowedBackByYou={
                    result.connections.not_followed_back_by_you
                }
                mutuals={result.connections.mutuals}
                profileUrlByUsername={profileUrlByUsername}
            />
            <FollowFirstLeaderboard
                timelines={mutualTimelines}
                profileUrlByUsername={profileUrlByUsername}
            />
        </div>
    );
}
