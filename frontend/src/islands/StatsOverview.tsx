import type { ProfileInfo } from "../lib/types";

interface StatsOverviewProps {
    profileInfo: ProfileInfo;
    totalFollowing: number;
    totalFollowers: number;
    mutualCount: number;
    notFollowingBackCount: number;
    notFollowedBackByYouCount: number;
}

export default function StatsOverview({
    profileInfo,
    totalFollowing,
    totalFollowers,
    mutualCount,
    notFollowingBackCount,
    notFollowedBackByYouCount,
}: StatsOverviewProps) {
    const secondaryStats = [
        { label: "Mutuals", value: mutualCount },
        { label: "Not following back", value: notFollowingBackCount },
        { label: "You don't follow back", value: notFollowedBackByYouCount },
    ];

    const ratioGap = totalFollowing - totalFollowers;

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6">
                {/* profile row */}
                <div className="flex items-center gap-4">
                    {profileInfo.profile_picture_url ? (
                        <img
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 shrink-0 object-cover"
                            src={profileInfo.profile_picture_url}
                            alt={profileInfo.username}
                        />
                    ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                        <p className="text-xl font-bold text-gray-900 truncate">
                            {profileInfo.name || "No name"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            @{profileInfo.username || "unknown"}
                        </p>
                    </div>

                    <div className="flex gap-6 shrink-0">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl md:text-3xl font-black text-gray-900 tabular-nums">
                                {totalFollowers.toLocaleString()}
                            </span>
                            <span className="text-xs md:text-sm font-medium text-gray-500 tracking-wide">
                                followers
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl md:text-3xl font-black text-gray-900 tabular-nums">
                                {totalFollowing.toLocaleString()}
                            </span>
                            <span className="text-xs md:text-sm font-medium text-gray-500 tracking-wide">
                                following
                            </span>
                        </div>
                    </div>
                </div>

                {/* secondary stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 pt-6 border-t border-gray-100">
                    <div className="flex flex-col items-center text-center gap-1 px-2">
                        <span className="text-lg font-bold text-emerald-600 tabular-nums">
                            {mutualCount.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 leading-tight">
                            Mutuals
                        </span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 px-2">
                        <span className="text-lg font-bold text-red-500 tabular-nums">
                            {notFollowingBackCount.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 leading-tight">
                            Not following back
                        </span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 px-2">
                        <span className="text-lg font-bold text-amber-500 tabular-nums">
                            {notFollowedBackByYouCount.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 leading-tight">
                            You don't follow back
                        </span>
                    </div>
                </div>
            </div>

            {ratioGap > 50 && (
                <div className="w-full bg-[#FEDC80] border border-amber-200 rounded-2xl p-5 flex flex-col gap-1">
                    <p className="font-semibold text-amber-900">
                        Holy ratio! Get your followers up! 🙈
                    </p>
                    {ratioGap > 100 && (
                        <p className="text-sm text-amber-800">
                            Seriously, this is not a good look.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
