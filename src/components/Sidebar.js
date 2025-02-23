import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-button" onClick={onClose}>✖</button>
            <ul>
                <li><Link to="/" onClick={onClose}>Home</Link></li>
                <li><Link to="/file_upload" onClick={onClose}>File Upload</Link></li>
                <li><Link to="/blog" onClick={onClose}>Blog</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
