import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./pages/FileUpload";
import Blog from "./pages/Blog";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import "./App.css"; // Make sure you have CSS for styling

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null); // Create a ref to the sidebar
    const menuButtonRef = useRef(null); // Create a ref for the menu button

    return (
        <Router>
            {/* Fixed Header with Menu Button */}
            <header className="app-header">
                <button
                    ref={menuButtonRef} // Attach ref to the button
                    className="menu-button"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click from bubbling up to document
                        setIsSidebarOpen(true); // Open the sidebar when the button is clicked
                    }}
                >
                    ☰
                </button>
                <h1 className="app-title">Spotify GDPR Data App</h1>
            </header>

            {/* Sidebar component */}
            <Sidebar
                ref={sidebarRef} // Attach the ref to Sidebar to detect clicks outside
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)} // Close sidebar when the close button is clicked
            />

            {/* Main Body */}
            <main className="app-body">
                <Routes>
                    <Route path="/" element={<h2>Home Page</h2>} />
                    <Route path="/file_upload" element={<FileUpload />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
