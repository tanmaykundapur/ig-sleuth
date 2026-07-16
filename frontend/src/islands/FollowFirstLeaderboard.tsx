import { useState } from "react";
import type { MutualTimeline } from "../lib/types";

interface FollowFirstLeaderboardProps {
    timelines: MutualTimeline[];
    profileUrlByUsername: Record<string, string>;
}
export default function FollowFirstLeaderboard({
    timelines,
    profileUrlByUsername,
}: FollowFirstLeaderboardProps) {
    const [selected, setSelected] = useState<MutualTimeline | null>(null);

    const peopleYouChased = timelines
        .filter((t) => t.followedFirst === "you")
        .slice(0, 5);

    const yourBiggestFans = timelines
        .filter((t) => t.followedFirst === "them")
        .slice(0, 5);

    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LeaderboardColumn
                    title="People you had to win over"
                    subtitle="You followed them first, they took their time"
                    items={peopleYouChased}
                    selectedUsername={selected?.username ?? null}
                    onSelect={setSelected}
                />
                <LeaderboardColumn
                    title="Your biggest fans"
                    subtitle="You took your time to follow them back"
                    items={yourBiggestFans}
                    selectedUsername={selected?.username ?? null}
                    onSelect={setSelected}
                />
            </div>

            {selected && (
                <a
                    href={profileUrlByUsername[selected.username]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-t border-gray-100 pt-4 flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                >
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-gray-900">
                            @{selected.username}
                        </p>

                        {selected.followedFirst === "them" ? (
                            <>
                                <p className="text-sm text-gray-600">
                                    They followed you:{" "}
                                    {new Date(
                                        selected.followedYouSince,
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    You followed them:{" "}
                                    {new Date(
                                        selected.followedThemSince,
                                    ).toLocaleDateString()}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600">
                                    You followed them:{" "}
                                    {new Date(
                                        selected.followedThemSince,
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    They followed you:{" "}
                                    {new Date(
                                        selected.followedYouSince,
                                    ).toLocaleDateString()}
                                </p>
                            </>
                        )}
                    </div>

                    <span className="text-2xl font-bold text-gray-900 shrink-0 ml-4">
                        {selected.gapDays} days
                    </span>
                </a>
            )}
        </div>
    );
}

function LeaderboardColumn({
    title,
    subtitle,
    items,
    selectedUsername,
    onSelect,
}: {
    title: string;
    subtitle: string;
    items: MutualTimeline[];
    selectedUsername: string | null;
    onSelect: (item: MutualTimeline) => void;
}) {
    return (
        <div>
            <p className="font-bold text-gray-900">{title}</p>
            <p className="text-sm text-gray-500 mb-5">{subtitle}</p>

            {items.length === 0 ? (
                <p className="text-sm text-gray-400">Nobody stands out here</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {items.map((item, rank) => (
                        <li key={item.username}>
                            <button
                                onClick={() => onSelect(item)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                                    selectedUsername === item.username
                                        ? "bg-gray-900 text-white"
                                        : "border border-gray-200 hover:bg-gray-50 text-gray-900"
                                }`}
                            >
                                <span className="text-sm font-medium">
                                    #{rank + 1} @{item.username}
                                </span>
                                <span
                                    className={`text-xs ${
                                        selectedUsername === item.username
                                            ? "text-gray-300"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {item.gapDays}d
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
