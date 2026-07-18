import { useState } from "react";
import type { AnalyzeResponse } from "../lib/types";

interface Props {
    onResult: (result: AnalyzeResponse) => void;
    onLoadingChange: (loading: boolean) => void;
    onError: (hasError: boolean) => void;
}

export default function UploadForm({
    onResult,
    onLoadingChange,
    onError,
}: Props) {
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    return (
        <div className="w-full max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <form className="w-full flex flex-col gap-4">
                <label
                    htmlFor="upload-file"
                    className="flex flex-col items-center justify-center gap-2 w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 px-4 text-center"
                >
                    <span className="text-sm font-medium text-gray-700">
                        {currentFile
                            ? currentFile.name
                            : "Choose your Instagram export"}
                    </span>
                    <span className="text-xs text-gray-400">
                        {currentFile
                            ? "Click to choose a different file"
                            : ".zip file from Instagram"}
                    </span>
                </label>

                <input
                    type="file"
                    name="uploadFile"
                    id="upload-file"
                    accept=".zip"
                    onChange={(e) => {
                        setCurrentFile(e.target.files?.[0] ?? null);
                    }}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={async () => {
                        onError(false);
                        if (currentFile == null) {
                            onError(true);
                            return;
                        }
                        let formData = new FormData();
                        formData.append("file", currentFile);
                        onLoadingChange(true);
                        try {
                            const response = await fetch(
                                "http://localhost:8000/analyze",
                                {
                                    method: "POST",
                                    body: formData,
                                },
                            );
                            if (!response.ok) {
                                onError(true);
                            } else {
                                const data: AnalyzeResponse =
                                    await response.json();
                                onResult(data);
                            }
                        } finally {
                            onLoadingChange(false);
                        }
                    }}
                    className="w-full py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#4150F7] transition-colors"
                >
                    Analyze
                </button>
            </form>
        </div>
    );
}
