import { useState } from "react";

type Tab = "not_following_back" | "not_followed_back_by_you" | "mutuals";

interface TabConfig {
    key: Tab;
    label: string;
    usernames: string[];
    headline: string;
    subtext: string;
}

interface ConnectionsListCardProps {
    notFollowingBack: string[];
    notFollowedBackByYou: string[];
    mutuals: string[];
    profileUrlByUsername: Record<string, string>;
}

export default function ConnectionsListCard({
    notFollowingBack,
    notFollowedBackByYou,
    mutuals,
    profileUrlByUsername,
}: ConnectionsListCardProps) {
    const [activeTab, setActiveTab] = useState<Tab>("not_following_back");
    const [searchTerm, setSearchTerm] = useState("");

    const tabs: TabConfig[] = [
        {
            key: "not_following_back",
            label: "Not following back",
            usernames: notFollowingBack,
            headline: `${notFollowingBack.length} accounts don't follow you back`,
            subtext: "Ur a fan! they do NOT know you 😭",
        },
        {
            key: "not_followed_back_by_you",
            label: "Doesn't follow you",
            usernames: notFollowedBackByYou,
            headline: `${notFollowedBackByYou.length} accounts you don't follow back`,
            subtext: "Congrats, you have fans! 👀",
        },
        {
            key: "mutuals",
            label: "Mutuals",
            usernames: mutuals,
            headline: `${mutuals.length} mutuals`,
            subtext: "These are your real homies 🤝",
        },
    ];

    const active = tabs.find((t) => t.key === activeTab)!;
    const filteredUsernames = active.usernames.filter((username) =>
        username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* tab strip */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                            activeTab === tab.key
                                ? "border-gray-900 text-gray-900"
                                : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-6 md:p-8">
                {/* per-tab headline */}
                <div className="pb-4">
                    <p className="text-2xl font-bold text-gray-900">
                        {active.headline}
                    </p>
                    <p className="pt-1 text-md text-gray-500">
                        {active.subtext}
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />

                {filteredUsernames.length === 0 ? (
                    <div className="h-72 flex items-center justify-center">
                        <p className="text-sm text-gray-400 text-center">
                            {active.usernames.length === 0
                                ? "Nobody here 🎉"
                                : `No matches for "${searchTerm}"`}
                        </p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-2 h-72 overflow-y-auto">
                        {filteredUsernames.map((username) => (
                            <li key={username}>
                                <a
                                    href={profileUrlByUsername[username]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
                                >
                                    <span className="text-sm font-medium text-gray-900">
                                        @{username}
                                    </span>
                                    <span className="text-gray-300">→</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
