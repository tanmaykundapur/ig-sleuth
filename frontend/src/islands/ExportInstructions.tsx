import {
    ArrowSquareOutIcon,
    CaretCircleLeftIcon,
    InfoIcon,
} from "@phosphor-icons/react";

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
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6 flex flex-col gap-3">
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Get your Instagram data
                </h2>
                <a
                    href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 my-3 rounded-lg border border-accent text-accent text-sm font-medium hover:bg-accent/10 transition-colors"
                >
                    Jump straight to the export page
                    <ArrowSquareOutIcon size={16} weight="bold" />
                </a>
            </div>

            <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    Link not working? See the manual steps
                    <CaretCircleLeftIcon
                        size={18}
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

                <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-accent/10 border border-accent/20 rounded-lg text-gray-700 text-xs">
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
