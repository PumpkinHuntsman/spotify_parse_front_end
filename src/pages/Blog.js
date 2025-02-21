import { useEffect, useState } from "react";

function Blog() {
    const [content, setContent] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:8080/api/blog")
            .then(response => response.text())
            .then(data => setContent(data))
            .catch(error => console.error("Error fetching blog content:", error));
    }, []);

    return (
        <div>
            <h1>Blog Page</h1>
            <p>{content}</p>
        </div>
    );
}

export default Blog;
