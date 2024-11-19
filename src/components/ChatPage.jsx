// import React, { useState } from "react";
// import classes from "./ChatPage.module.css"

// function ChatPage() {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");

//   const handleSendMessage = () => {
//     if (!userInput.trim()) return;

//     const userMessage = { sender: "user", text: userInput };
//     setMessages([...messages, userMessage]);

//     // Имитируем ответ бота (можно заменить на запрос к AI API)
//     const botResponse = getBotResponse(userInput);
//     const botMessage = { sender: "bot", text: botResponse };

//     setMessages([...messages, userMessage, botMessage]);
//     setUserInput("");
//   };

//   const getBotResponse = (input) => {
//     if (input.toLowerCase().includes("программирование")) {
//       return "Программирование — отличная профессия для тех, кто любит решать задачи и работать с технологиями!";
//     } else if (input.toLowerCase().includes("университет")) {
//       return "Могу посоветовать несколько университетов, где доступны гранты. Хотите узнать больше?";
//     } else {
//       return "Я здесь, чтобы помочь вам с любыми вопросами по карьере и образованию. Спрашивайте!";
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h1>Чат с карьерным ботом</h1>
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
//             <p>{msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={userInput}
//         placeholder="Введите ваш вопрос..."
//         onChange={(e) => setUserInput(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//       />
//       <button onClick={handleSendMessage}>Отправить</button>
//     </div>
//   );
// }

// export default ChatPage;


// import React, { useState } from 'react';
// import ChatHistory from "./ChatHistory";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import MyLoader from './UI/MyLoader';
// // import './App.css';

// function ChatPage() {
//   const [userInput, setUserInput] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const genAI = new GoogleGenerativeAI("AIzaSyB9_RZgG1JqNacXEL9gfDdhwmHMpaBrp_M");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: `You have to always type in English.You are a high—class career assistant and a professional artificial intelligence consultant whose task is to help users find the ideal career path and resolve their doubts about their future profession. You have extensive knowledge in various industries, understand current trends in the labor market and are able to give valuable recommendations on skills development and career planning.

// Your key tasks:
// 1. Analysis of the user's interests and goals: Always clarify the context and ask additional questions to understand the user's goals and preferences. For example, find out what he is interested in, what skills he has and what experience he already has.
// 2. Recommendations for training and development: Offer the user useful courses, trainings and study directions that will help them achieve their goals.
// 3. Choosing the ideal profession: Help the user identify possible career options based on their interests, skills and current trends in the labor market.
// 4. Motivation and support: Always be friendly and support the user. Give us tips that will help him overcome doubts and develop confidence in his actions.
// 5. Trends and insights: Explain current and future trends in various industries, as well as suggest in-demand skills that can help the user achieve their career goals faster.

// Examples of dialogues:

// 1. User: "I'm not sure what profession to choose after graduation."
//    Your response: "I understand your doubts. Let's start by analyzing your interests and skills. What do you like to do most in your free time? Maybe you already have experience in some field that could be the basis for a career?"

// 2. User: "Should I study programming if I want to change my profession?"
//    Your response: "If you are considering a career change and want to enter IT, programming can be a great option. Now it is a sought-after and well-paid area. Start by learning Python or JavaScript, as these languages are popular and have many uses. I can recommend some free courses to start with."

// 3. User: "How to choose between a career in marketing and data analytics?"
//    Your response: "Both professions have their advantages. Marketing is suitable for those who love creativity and strategic planning, and data analytics is suitable for those who like to work with numbers and solve complex problems. Think about which tasks bring you more pleasure. If you are interested, I can offer several resources for learning the basics of each area so that you can figure out which suits you best."

// Please answer the user's next question by providing a comprehensive and useful answer that will help them take a confident step towards their ideal profession.` });

//   // Обработчик ввода пользователя
//   const handleUserInput = (e) => {
//     setUserInput(e.target.value);
//   };

//   // Отправка сообщения
//   const sendMessage = async () => {
//     if (userInput.trim() === "") return;
//     setIsLoading(true);
//     try {
//       const result = await model.generateContent(userInput);
//       const response = await result.response;
//       console.log(response);

//       // Обновляем chatHistory правильно
//       setChatHistory([
//         ...chatHistory,
//         { type: "user", message: userInput },
//         { type: "bot", message: response.text() }
//       ]);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setUserInput("");
//       setIsLoading(false);
//     }
//   };

//   // Очистка чата
//   const clearChat = () => {
//     setChatHistory([]);
//   };

//   return (
//     <div>
//       <h1>CareerPath AI</h1>
//       {isLoading ? (
//         <MyLoader />
//       ) : (
//         <ChatHistory chatHistory={chatHistory} />
//       )}
//       <input
//         type="text"
//         placeholder="Введите сообщение"
//         value={userInput}
//         onChange={handleUserInput}
//       />
//       <button onClick={sendMessage} disabled={isLoading}>Send</button>
//       <button onClick={clearChat}>Clear</button>
//     </div>
//   );
// }

// export default ChatPage;



import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";
import MyLoader from "./UI/MyLoader";
import classes from "./ChatPage.module.css";

function ChatPage() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Инициализация Google Generative AI
  const genAI = new GoogleGenerativeAI("AIzaSyB9_RZgG1JqNacXEL9gfDdhwmHMpaBrp_M");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a high-class career consultant and AI expert specializing in career guidance. 
You assist users in identifying their ideal career paths, providing detailed, structured, and motivational advice. 
Your task includes:
1. Analyzing the user's interests, skills, and goals.
2. Recommending suitable professions, fields, and next steps for career growth.
3. Explaining current job market trends and in-demand skills.
4. Motivating users with inspiring and actionable advice.

Please respond professionally and visually format the output in Markdown for a better user experience.`,
  });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Генерация ответа от модели
      const result = await model.generateContent(userInput);
      const response = await result.response;

      // Обновление истории чата
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setChatHistory([
        ...chatHistory,
        { type: "bot", message: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <h1 className={classes.title}>CareerPath AI</h1>
        <div className={classes.chatBox}>
  {isLoading ? (
    <div className={classes["loader-container"]}>
      <MyLoader />
    </div>
  ) : (
    <ChatHistory chatHistory={chatHistory} />
  )}
</div>
        <div className={classes.inputSection}>
          <input
            className={classes.inputField}
            type="text"
            placeholder="Ask for career advice..."
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
          />
          <div className={classes.buttonContainer}>
            <button className={classes.sendButton} onClick={sendMessage} disabled={isLoading}>
              Send
            </button>
            <button className={classes.clearButton} onClick={clearChat}>
              Clear
            </button>
            <button className={classes.btnLink}>
              <Link className={classes.BtnLinkP} to="/">Go Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;