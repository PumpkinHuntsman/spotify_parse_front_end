import { useState, useEffect } from "react";

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
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
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8080/api/files/upload", {
                method: "POST",
                body: formData,
            });

            let responseText = await response.text()
            responseText = responseText.replace("java.lang.Exception: ", "")

            if (response.ok) {
                alert("File uploaded successfully!");
                await fetchFiles(); // Refresh file list
            } else {
                alert("File uploaded successfully, but it isn't the right type.\n" + responseText);
                await fetchFiles(); // Refresh file list
            }
        } catch (error) {
            alert("File Upload Failed - Too Large?")
            console.error("Upload error:", error);
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
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
