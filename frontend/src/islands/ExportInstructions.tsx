export default function ExportInstructions() {
    return (
        <div className="w-full mx-auto mb-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <details open className="group p-4 md:p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h2 className="text-lg font-semibold text-gray-900">
                        How to get your Instagram data
                    </h2>
                    <span className="text-2xl text-gray-400 transition-transform duration-200 rotate-90 group-open:rotate-0">
                        ▾
                    </span>
                </summary>

                <ol className="mt-4 flex flex-col gap-2 text-sm text-gray-600 list-decimal list-inside">
                    <li>
                        Open Instagram and tap the{" "}
                        <span className="font-semibold text-gray-900">
                            ☰ menu icon
                        </span>{" "}
                        in the top right
                    </li>
                    <li>
                        Tap{" "}
                        <span className="font-semibold text-gray-900">
                            Accounts Center
                        </span>
                    </li>
                    <li>
                        Tap{" "}
                        <span className="font-semibold text-gray-900">
                            Your information and permissions
                        </span>
                    </li>
                    <li>
                        Tap{" "}
                        <span className="font-semibold text-gray-900">
                            Export your information
                        </span>
                    </li>
                    <li>
                        Tap{" "}
                        <span className="font-semibold text-gray-900">
                            Create export
                        </span>
                    </li>
                    <li>
                        Select{" "}
                        <span className="font-semibold text-gray-900">
                            Export to device
                        </span>
                    </li>
                    <li>
                        Tap{" "}
                        <span className="font-semibold text-gray-900">
                            Customize information
                        </span>
                        , and check only{" "}
                        <span className="font-semibold text-gray-900">
                            Followers and Following
                        </span>
                    </li>
                    <li>
                        Set the date range to{" "}
                        <span className="font-semibold text-gray-900">
                            All time
                        </span>
                    </li>
                    <li>
                        Under Format, select{" "}
                        <span className="font-semibold text-gray-900">
                            JSON
                        </span>
                    </li>
                    <li>
                        Tap{" "}
                        <span className="font-semibold text-gray-900">
                            Start export
                        </span>
                    </li>
                </ol>
            </details>
        </div>
    );
}
