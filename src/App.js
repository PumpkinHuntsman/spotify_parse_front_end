import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FileUpload from "./pages/FileUpload";
import Blog from "./pages/Blog";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
      <Router>
          <nav>
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/file_upload">File Upload</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
              </ul>
          </nav>

          <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/file_upload" element={<FileUpload />} />
              <Route path="/blog" element={<Blog />} />
          </Routes>
      </Router>
  );
}

export default App;
