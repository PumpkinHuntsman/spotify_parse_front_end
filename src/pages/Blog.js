import { useState, useEffect } from "react";

function Blog() {
    const [previews, setPreviews] = useState([]);
    const [blogContent, setBlogContent] = useState("");

    useEffect(() => {
        fetchPreviews();
        fetchBlogContent();
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

    const fetchBlogContent = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/blog");
            const data = await response.text(); // Since blog content is plain text
            setBlogContent(data);
        } catch (error) {
            console.error("Error fetching blog content:", error);
        }
    };

    return (
        <div>
            <h1>Blog</h1>

            <h2>Latest Blog Content</h2>
            <p>{blogContent || "No content available."}</p>

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
