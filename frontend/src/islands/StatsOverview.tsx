interface StatsOverviewProps {
    totalFollowing: number;
    totalFollowers: number;
    mutualCount: number;
    notFollowingBackCount: number;
    notFollowedBackByYouCount: number;
}

export default function StatsOverview({
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

    return (
        <>
            <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6">
                {/* profile row */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 shrink-0" />

                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">
                                {totalFollowers.toLocaleString()}
                            </span>
                            <span className="text-xs md:text-sm text-gray-500">
                                Followers
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-gray-900">
                                {totalFollowing.toLocaleString()}
                            </span>
                            <span className="text-xs md:text-sm text-gray-500">
                                Following
                            </span>
                        </div>
                    </div>
                </div>

                {/* secondary stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    {secondaryStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center text-center gap-1"
                        >
                            <span className="text-lg md:text-xl font-semibold text-gray-900">
                                {stat.value.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mx-auto bg-[#FEDC80] border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-3">
                {totalFollowing - totalFollowers > 50 && (
                    <h1 className="font-bold">
                        Holy ratio! Get your followers up! 🙈
                    </h1>
                )}
                {totalFollowing - totalFollowers > 100 && (
                    <h1 className="font-bold">
                        Seriously, this is not a good look.
                    </h1>
                )}
            </div>
        </>
    );
}
