// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import "./App.css";

// function ResultsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const result = location.state?.result || "Нет данных для отображения";

//   return (
//     <div className="results-container">
//       <h1>Результаты анализа</h1>
//       <p>{result}</p>
//       <button onClick={() => navigate("/")}>Вернуться назад</button>
//     </div>
//   );
// }

// export default ResultsPage;




// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import "./App.css";

// function ResultsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { formData, recommendedProfession, universities } = location.state || {};

//   if (!formData || !recommendedProfession) {
//     return <p>Нет данных для отображения. Вернитесь назад и заполните форму.</p>;
//   }

//   return (
//     <div className="results-container">
//       <h1>Результаты анализа</h1>
//       <p><strong>Имя:</strong> {formData.name}</p>
//       <p><strong>Возраст:</strong> {formData.age}</p>
//       <p><strong>Образование:</strong> {formData.education}</p>
//       <p><strong>Интересы:</strong> {formData.interests}</p>
//       <p><strong>Цели:</strong> {formData.goals}</p>
//       <h2>Рекомендуемая профессия:</h2>
//       <p>{recommendedProfession}</p>
//       <h2>Подходящие университеты:</h2>
//       <ul>
//         {universities.map((university, index) => (
//           <li key={index}>{university}</li>
//         ))}
//       </ul>
//       <button onClick={() => navigate("/")}>Вернуться назад</button>
//     </div>
//   );
// }

// export default ResultsPage;




// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import classes from "./ResultsPage.module.css"

// function ResultsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log('cirrus')
//   const { formData, recommendedProfession, analysis, pros, cons, recommendedUniversities } = location.state || {};

//   if (!formData) {
//     return <p>No data to display. Go back and fill out the form.</p>;
//   }

//   return (
//     <div className={classes.resultsMain}>
//       <h1 className={classes.hResults}>Analysis results</h1>
//       <h2>Recommended profession: {recommendedProfession}</h2>
//       <p>{analysis}</p>
//       <h3>Advantages:</h3>
//       <ul>
//         {pros.map((pro, index) => <li key={index}>{pro}</li>)}
//       </ul>
//       <h3>Disadvantages:</h3>
//       <ul>
//         {cons.map((con, index) => <li key={index}>{con}</li>)}
//       </ul>
//       <h2>Recommended Universities:</h2>
//       {recommendedUniversities.map((uni, index) => (
//         <div key={index}>
//           <h3>{uni.name} ({uni.country})</h3>
//           <img src={uni.photo} alt={uni.name} style={{ width: "200px" }} />
//           <p>{uni.description}</p>
//           <h4>Grants:</h4>
//           <ul>
//             {uni.grants.map((grant, i) => <li key={i}>{grant}</li>)}
//           </ul>
//         </div>
//       ))}
//       <div className={classes.buttons}>
//       <button className={classes.button} onClick={() => navigate("/")}>Go back</button>
//       <button className={classes.button} onClick={() => navigate("/chat")}>Chat with a bot</button>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function ResultsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { formData, aiAnalysis } = location.state || {};

//   return (
//     <div className="results-container">
//       <h1>Analysis Results</h1>
//       <h2>User Information:</h2>
//       <p><strong>Name:</strong> {formData?.name || "Not provided"}</p>
//       <p><strong>Age:</strong> {formData?.age || "Not provided"}</p>
//       <p><strong>Education:</strong> {formData?.education || "Not provided"}</p>
//       <p><strong>Interests:</strong> {formData?.interests || "Not provided"}</p>
//       <p><strong>Goals:</strong> {formData?.goals || "Not provided"}</p>
//       <p><strong>Qualities:</strong> {formData?.qualities || "Not provided"}</p>

//       <h2>AI Analysis:</h2>
//       <p>{aiAnalysis || "No analysis available."}</p>

//       <button onClick={() => navigate(-1)}>Go Back</button>
//     </div>
//   );
// }

// export default ResultsPage;



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