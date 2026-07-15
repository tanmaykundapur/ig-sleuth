interface NotFollowingBackHeroProps {
    usernames: string[];
    profileUrlByUsername: Record<string, string>;
}

export default function NotFollowingBackHero({
    usernames,
    profileUrlByUsername,
}: NotFollowingBackHeroProps) {
    return (
        <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <div className="pb-3">
                <h1 className="text-xl font-bold">
                    {usernames.length} don't follow you back
                </h1>
                <h2 className="text-md text-gray-800 pb-1">
                    (Ur a fan 😭 They do NOT know you)
                </h2>
            </div>
            {usernames && (
                <ul className="max-h-60 overflow-y-auto">
                    {usernames.map((username, index) => (
                        <li
                            className="m-1 p-4 border border-gray-200 rounded-2xl hover:font-bold"
                            key={index}
                        >
                            <a
                                href={profileUrlByUsername[username]}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {username}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
