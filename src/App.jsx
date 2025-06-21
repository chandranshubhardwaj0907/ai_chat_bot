import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateResponse() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(''); // Clear previous answer
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBHKKTmwXrNMj8SSBaavuUiWZhKmlvoJOU",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }]
            }
          ]
        }
      });

      const result = response.data.candidates[0].content.parts[0].text;
      setAnswer(result);
    } catch (error) {
      console.error(error);
      setAnswer("⚠️ Failed to fetch response.");
    }
    setLoading(false);
  }

  return (
    <div className="app">
      <h1> AI Chatbot</h1>
      <div className="chat-container">
        <textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button onClick={generateResponse} disabled={loading}>
          {loading ? 'Thinking...' : 'Ask Gemini'}
        </button>
        {answer && (
          <div className="chat-response">
            <strong>Gemini:</strong>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
