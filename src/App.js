import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MyLoader from "../src/components/UI/MyLoader";
import ResultsPage from "./components/ResultsPage";

function ProgressBar({ step }) {
  const progress = (step / 5) * 100; // Updated to accommodate 5 steps
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    education: "",
    interests: "",
    goals: "",
    qualities: "",
    region: "", // New field for region
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI("AIzaSyB9_RZgG1JqNacXEL9gfDdhwmHMpaBrp_M");

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const sendMessage = async (formData) => {
    const { name, age, education, interests, goals, qualities, region } = formData;
    const prompt = `
      Analyze the following user profile data:
      - Name: ${name || "Not provided"}
      - Age: ${age || "Not provided"}
      - Education: ${education || "Not provided"}
      - Interests: ${interests || "Not provided"}
      - Goals: ${goals || "Not provided"}
      - Personal Qualities: ${qualities || "Not provided"}
      - Region: ${region || "Not provided"}
      
      Based on this information, provide a career recommendation and explain why this career is suitable.
      Additionally, list universities and institutes in the region (${region || "not provided"}) that match the user's profile.
      and also display in the form of a list the names of suitable universities and institutes that the user can enroll in and display pictures of these universities and institutes
    `;

    try {
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.candidates[0].content.parts[0].text;
      return aiResponse;
    } catch (error) {
      console.error("Error with AI analysis:", error.message || error);
      return "Error occurred during AI analysis.";
    }
  };

  const analyzeAnswers = async () => {
    setIsLoading(true); // Показать загрузку
    const aiAnalysis = await sendMessage(formData);
    setIsLoading(false); // Скрыть загрузку

    navigate("/results", {
      state: {
        formData,
        aiAnalysis,
      },
    });
  };

  return (
    <div className="app-container">
      <h1 className="pApp">Career Advisor</h1>
      <ProgressBar step={step} />
      {step === 0 && (
        <>
          {step === 0 && (
            <button className="btnAdvisor" onClick={() => setStep(step + 1)}>
              Begin quiz
            </button>
          )}
        </>
      )}
      {step === 1 && (
        <>
          <h2>Basic Information</h2>
          <p>Name:</p>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <p>Age:</p>
          <input type="number" name="age" placeholder="Age" onChange={handleChange} />
          <p>Education:</p>
          <select name="education" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Incomplete secondary">Incomplete secondary</option>
            <option value="Secondary">Secondary</option>
            <option value="Higher">Higher</option>
            <option value="Bachelor's degree">Bachelor's degree</option>
          </select>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Region</h2>
          <p>Where do you currently reside?</p>
          <input
            type="text"
            name="region"
            placeholder="Enter your region (e.g., California, Astana)"
            onChange={handleChange}
          />
        </>
      )}
      {step === 3 && (
        <>
          <h2>Interests</h2>
          <p>Enter your interests (e.g., programming, design, sport, music):</p>
          <input type="text" name="interests" placeholder="Your interests" onChange={handleChange} />
          <p>Goals:</p>
          <input type="text" name="goals" placeholder="Your career goals" onChange={handleChange} />
        </>
      )}
      {step === 4 && (
        <>
          <h2>Personal Qualities</h2>
          <p>Describe your personal qualities:</p>
          <input
            type="text"
            name="qualities"
            placeholder="Qualities (e.g., creative, analytical)"
            onChange={handleChange}
          />
        </>
      )}
      {step === 5 && (
        <>
          {isLoading ? <MyLoader /> : <button onClick={analyzeAnswers}>Analyze</button>}
        </>
      )}
      <div className="buttons">
        {step >= 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
        {step >= 1 && step < 5 && <button onClick={() => setStep(step + 1)}>Next</button>}
      </div>
    </div>
  );
}

export default App;