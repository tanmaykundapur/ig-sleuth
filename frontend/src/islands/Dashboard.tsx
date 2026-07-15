import { useState } from "react";
import type { ConnectionsAnalysisResult } from "../lib/types";
import NotFollowingBackHero from "./NotFollowingBackHero";
import StatsOverview from "./StatsOverview";
import UploadForm from "./UploadForm";

export default function Dashboard() {
    const [result, setResult] = useState<ConnectionsAnalysisResult | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

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

            {result && <DashboardContent result={result} />}
        </div>
    );
}

function DashboardContent({ result }: { result: ConnectionsAnalysisResult }) {
    const profileUrlByUsername: Record<string, string> = {};
    for (const rel of result.snapshot.relationships) {
        profileUrlByUsername[rel.username] = rel.profile_url;
    }

    const totalFollowing = result.snapshot.relationships.filter(
        (r) => r.relationship_type === "following",
    ).length;

    const totalFollowers = result.snapshot.relationships.filter(
        (r) => r.relationship_type === "follower",
    ).length;

    const mutualCount = result.mutuals.length;
    const notFollowingBackCount = result.not_following_back.length;
    const notFollowedBackByYouCount = result.not_followed_back_by_you.length;

    return (
        <div className="w-full flex flex-col gap-8">
            <StatsOverview
                totalFollowing={totalFollowing}
                totalFollowers={totalFollowers}
                mutualCount={mutualCount}
                notFollowingBackCount={notFollowingBackCount}
                notFollowedBackByYouCount={notFollowedBackByYouCount}
            />
            <NotFollowingBackHero
                usernames={result.not_following_back}
                profileUrlByUsername={profileUrlByUsername}
            />
        </div>
    );
}
