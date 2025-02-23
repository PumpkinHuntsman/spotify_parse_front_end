import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./pages/FileUpload";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Sidebar from "./components/Sidebar";
import "./App.css";


function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Router>
            <header className="app-header">
                <button
                    className="menu-button"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ☰
                </button>
                <h1 className="app-title">Spotify GDPR Data App</h1>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="app-body">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/file_upload" element={<FileUpload />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
