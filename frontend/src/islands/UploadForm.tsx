import { useState } from "react";

export default function UploadForm() {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div>
            <form action="">
                <input
                    type="file"
                    name="uploadFile"
                    id="upload-file"
                    onChange={(e) => {
                        setCurrentFile(e.target.files?.[0] ?? null);
                    }}
                />
                <button
                    type="button"
                    onClick={async () => {
                        setError(false);
                        if (currentFile == null) {
                            setError(true);
                            return;
                        }
                        let formData = new FormData();
                        formData.append("file", currentFile);
                        setIsLoading(true);
                        const response = await fetch(
                            "http://localhost:8000/analyze/connections",
                            {
                                method: "POST",
                                body: formData,
                            },
                        );
                        setIsLoading(false);

                        if (!response.ok) setError(true);
                        else {
                            const data = await response.json();
                            setResult(data);
                        }
                    }}
                >
                    Submit
                </button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p>Something went wrong.</p>}
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}
