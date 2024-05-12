import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#282c34');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      // Change background color
      setBackgroundColor(getRandomColor());
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const getRandomColor = () => {
    // Generating a random color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleClick = () => {
    fetchQuote();
  };

  return (
    <div id="quote-box" className="container">
      <div id="text" className="quote">
        "{quote}"
      </div>
      <div id="author" className="author">
        - {author}
      </div>
      <div className="buttons">
        <button
          id="new-quote"
          onClick={handleClick}
          style={{ backgroundColor: backgroundColor }}
        >
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: backgroundColor }}
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
}

export default App;
