import {useEffect, useState} from "react";

function Home() {
    const [previews, setPreviews] = useState([]);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

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
            <h1>Home</h1>
            <p>
                Hello and welcome to this simple web app to determine your top 10 songs of all time from spotify.
            </p>
            <p>
                First you will need to request your data from spotify, <a href="https://support.stats.fm/docs/import/spotify-import/" target="_blank">This guide </a> will tell you how.
                Once you have your data come back here and using the `☰` symbol go to the file upload page <a href="http://localhost:8080/file_upload">Or click here</a> to upload your files
            </p>
            <p>
                Once you have uploaded your files you can come back here to look at their previews
            </p>
            <p>
                Or go to the <a href="http://localhost:8080/blog">Blog page</a> to see your top 10!
            </p>
            <h2>File Previews</h2>
            {previews.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                <div className="preview-carousel">
                    <div className="preview-box">
                        <button className="carousel-arrow left" onClick={goToPreviousPreview}>←</button>
                        <div className="preview-content">
                            <h3>{previews[currentPreviewIndex].fileName}</h3>
                            <p>{previews[currentPreviewIndex].preview}</p>
                        </div>
                        <button className="carousel-arrow right" onClick={goToNextPreview}>→</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;