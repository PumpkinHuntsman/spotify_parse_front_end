import { useState } from "react";

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8080/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully!");
            } else {
                alert("File upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
