import { useState, useEffect } from "react";

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/files");
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // store multiple files
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        // Append all selected files to formData
        Array.from(selectedFiles).forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await fetch("http://localhost:8080/api/files/upload", {
                method: "POST",
                body: formData,
            });

            let responseText = await response.text();
            responseText = responseText.replace("java.lang.Exception: ", "");

            if (response.ok) {
                alert("Files uploaded successfully!\n" + responseText);
                await fetchFiles(); // Refresh file list
            } else {
                alert("Files uploaded, but some are of incorrect type.\n" + responseText);
                await fetchFiles(); // Refresh file list
            }
        } catch (error) {
            alert("File Upload Failed - Too Large?");
            console.error("Upload error:", error);
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input
                type="file"
                onChange={handleFileChange}
                multiple // Allow selecting multiple files
            />
            <button onClick={handleUpload}>Upload</button>

            <h2>Uploaded Files</h2>
            <ul>
                {files.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    files.map((file, index) => (
                        <li key={index}>
                            <a href={`http://localhost:8080/api/files/download/${file}`} download>
                                {file}
                            </a>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default FileUpload;
