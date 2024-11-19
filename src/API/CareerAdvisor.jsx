// import React from 'react';
// import axios from 'axios';

// export const getCareerAdvice = async (userAnswers) => {
//     try {
//       const context = `
//         Ты — опытный виртуальный наставник по карьере. Пользователь прошёл тест и дал следующие ответы:
//         ${userAnswers}
//         Используй свои знания о современных профессиях и трендах на рынке труда, чтобы предложить подходящую карьеру.
//       `;
  
//       const response = await axios.post(
//         'https://api.gemini.com/v1/complete',
//         {
//           prompt: context,
//           max_tokens: 150,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//           },
//         }
//       );
  
//       return response.data.choices[0].text;
//     } catch (error) {
//       console.error('Ошибка при запросе к API:', error);
//       return 'Извините, произошла ошибка при получении рекомендаций.';
//     }
//   };