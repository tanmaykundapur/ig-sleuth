import { useState } from "react";
import type { ConnectionsAnalysisResult } from "../lib/types";
import NotFollowingBackHero from "./NotFollowingBackHero";
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

    return (
        <div className="w-full flex flex-col gap-8">
            <NotFollowingBackHero
                usernames={result.not_following_back}
                profileUrlByUsername={profileUrlByUsername}
            />
        </div>
    );
}
