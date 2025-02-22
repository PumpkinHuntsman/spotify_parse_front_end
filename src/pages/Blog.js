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
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare, mi a imperdiet placerat,
                nunc ipsum dignissim odio, nec faucibus leo ex vel risus. Sed sollicitudin arcu quis malesuada posuere.
                Praesent molestie orci ac blandit blandit. Donec fringilla tempor hendrerit. Fusce vestibulum ante in
                nibh laoreet, sit amet pellentesque ipsum hendrerit. Aliquam nec turpis volutpat, interdum risus in,
                hendrerit ipsum. Donec justo velit, malesuada nec tortor at, condimentum malesuada nunc. Integer rutrum
                lacus eu quam vestibulum, nec sagittis ex pharetra. Ut vehicula eros erat, vulputate porttitor ex
                scelerisque eget. Duis eu pharetra orci. Mauris sit amet nisl tempor risus posuere blandit.
                Donec convallis feugiat neque, finibus sagittis augue lobortis quis. Sed condimentum massa et s
                uscipit condimentum. Etiam id tristique velit. "
            </p>
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
