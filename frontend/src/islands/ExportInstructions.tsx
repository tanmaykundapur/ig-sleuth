import { CaretCircleLeftIcon, InfoIcon } from "@phosphor-icons/react";

interface Step {
    text: string;
    bold: string;
}

const steps: Step[] = [
    {
        text: "Open Instagram and tap the",
        bold: "☰ menu icon in the top right",
    },
    { text: "Tap", bold: "Accounts Center" },
    { text: "Tap", bold: "Your information and permissions" },
    { text: "Tap", bold: "Export your information" },
    { text: "Tap", bold: "Create export" },
    { text: "Select", bold: "Export to device" },
    { text: "Tap", bold: "Customize information" },
    { text: "Set the date range to", bold: "All time" },
    { text: "Under Format, select", bold: "JSON" },
    { text: "Tap", bold: "Start export" },
];

export default function ExportInstructions() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
            <details open className="group p-4 md:p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h2 className="text-lg font-semibold text-gray-900">
                        How to get your Instagram data
                    </h2>
                    <CaretCircleLeftIcon
                        size={20}
                        className="text-gray-400 transition-transform duration-200 group-open:rotate-270"
                    />
                </summary>

                <ol className="mt-4 flex flex-col gap-3 text-sm text-gray-600 list-decimal list-inside">
                    {steps.map((step, index) => (
                        <li key={index}>
                            {step.text}{" "}
                            <span className="font-semibold text-gray-900">
                                {step.bold}
                            </span>
                        </li>
                    ))}
                </ol>

                <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-xs">
                    <InfoIcon
                        size={16}
                        weight="fill"
                        className="shrink-0 mt-0.5"
                    />
                    <p>
                        Select as many categories as you're comfortable with —
                        the more you include, the more of your data we can show
                        you. At minimum, include{" "}
                        <span className="font-semibold">
                            Followers and Following
                        </span>
                        .
                    </p>
                </div>
            </details>
        </div>
    );
}
