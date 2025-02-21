import { useState, useEffect } from "react";

function Blog() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetchPreviews();
    }, []);

    const fetchPreviews = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/files/previews");
            const data = await response.json();
            setPreviews(data);
        } catch (error) {
            console.error("Error fetching file previews:", error);
        }
    };

    return (
        <div>
            <h1>Blog</h1>
            <h2>File Previews</h2>
            <ul>
                {previews.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    previews.map((preview, index) => (
                        <li key={index}>{preview}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Blog;
