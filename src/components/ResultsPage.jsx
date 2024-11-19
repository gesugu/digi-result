
import React from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import classes from "./ResultsPage.module.css"

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, aiAnalysis } = location.state || {};

  return (
    <div className="results-container">
      <h1>Analysis Results</h1>

      <h2>User Information</h2>
      <p><strong>Name:</strong> {formData?.name || "Not provided"}</p>
      <p><strong>Age:</strong> {formData?.age || "Not provided"}</p>
      <p><strong>Education:</strong> {formData?.education || "Not provided"}</p>
      <p><strong>Interests:</strong> {formData?.interests || "Not provided"}</p>
      <p><strong>Goals:</strong> {formData?.goals || "Not provided"}</p>
      <p><strong>Qualities:</strong> {formData?.qualities || "Not provided"}</p>

      <h2>AI Analysis</h2>
      {/* Render Markdown-formatted AI response */}
      <ReactMarkdown className="ai-analysis">{aiAnalysis}</ReactMarkdown>

      <div className={classes.parentBtns}>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button className={classes.btnParent1}><Link className={classes.btn} to="/chat">Chat With AI</Link></button>
      </div>
    </div>
  );
}

export default ResultsPage;