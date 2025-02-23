import { useState, useEffect } from "react";

function Blog() {
    const [previews, setPreviews] = useState([]);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0); // Track the current preview index
    const [blogContent, setBlogContent] = useState("");
    const [top10Content, setTop10Content] = useState("");

    useEffect(() => {
        fetchPreviews();
        fetchBlogContent();
        fetchTop10Content();
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

    const fetchTop10Content = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/blog/top10");
            const data = await response.text();
            setTop10Content(data);
        } catch (error) {
            console.error("Error fetching top 10 songs:", error);
        }
    };

    const goToPreviousPreview = () => {
        setCurrentPreviewIndex((prevIndex) =>
            prevIndex === 0 ? previews.length - 1 : prevIndex - 1
        );
    };

    const goToNextPreview = () => {
        setCurrentPreviewIndex((prevIndex) =>
            prevIndex === previews.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
            <h1>Blog</h1>

            <h2>Latest Blog Content</h2>
            <p>{blogContent || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare, mi a " +
                "imperdiet placerat, nunc ipsum dignissim odio, nec faucibus leo ex vel risus. Sed sollicitudin " +
                "arcu quis malesuada posuere. Praesent molestie orci ac blandit blandit. Donec fringilla tempor " +
                "hendrerit. Fusce vestibulum ante in nibh laoreet, sit amet pellentesque ipsum hendrerit. Aliquam " +
                "nec turpis volutpat, interdum risus in, hendrerit ipsum. Donec justo velit, malesuada nec tortor at," +
                "condimentum malesuada nunc. Integer rutrum lacus eu quam vestibulum, nec sagittis ex pharetra. Ut " +
                "vehicula eros erat, vulputate porttitor ex scelerisque eget. Duis eu pharetra orci. Mauris sit amet " +
                "nisl tempor risus posuere blandit. Donec convallis feugiat neque, finibus sagittis augue lobortis " +
                "quis. Sed condimentum massa et suscipit condimentum. Etiam id tristique velit. "}</p>

            <h2>File Previews</h2>
            {previews.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                <div className="preview-carousel">
                    <div className="preview-box">
                        <button className="carousel-arrow left" onClick={goToPreviousPreview}>←</button>
                        <p>{previews[currentPreviewIndex]}</p>
                        <button className="carousel-arrow right" onClick={goToNextPreview}>→</button>
                    </div>
                </div>
            )}

            <h2>Top 10 Songs</h2>
            <p>{top10Content || "No Top Songs Yet, please upload a file"}</p>
        </div>
    );
}

export default Blog;
