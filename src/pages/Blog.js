import { useState, useEffect } from "react";

function Blog() {
    const [blogContent, setBlogContent] = useState("");
    const [top10Content, setTop10Content] = useState([]);

    useEffect(() => {
        fetchBlogContent();
        fetchTop10Content();
    }, []);

    const fetchBlogContent = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/blog");
            const data = await response.text();
            setBlogContent(data);
        } catch (error) {
            console.error("Error fetching blog content:", error);
        }
    };

    const fetchTop10Content = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/blog/top10");
            const data = await response.json();
            setTop10Content(data);
        } catch (error) {
            console.error("Error fetching top 10 songs:", error);
        }
    };

    return (
        <div>
            <h1>Blog</h1>

            <h2>Latest Blog Content</h2>
            <p>{blogContent || "No blog content available."}</p>

            <h2>Top 10 Songs</h2>
            {top10Content.length === 0 ? (
                <p>No Top Songs Yet, please upload a file</p>
            ) : (
                <ol>
                    <p>The songs that you've listened to the most in the files you have uploaded so far are bellow</p>
                    {top10Content.map((track, index) => (
                        <li key={index}>{track}</li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export default Blog;
