import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Questions = () => {
  const location = useLocation();
  const { selectedLanguage } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(4).fill(false)); // Array to track selected answers
  const [isAnswered, setIsAnswered] = useState(false); // Flag to check if question is answered
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getQuestions?language=${selectedLanguage}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedLanguage) {
      fetchData();
    }
  }, [selectedLanguage]);

  const handleAnswerClick = (optionIndex) => {
    if (!isAnswered) {
      const updatedSelectedAnswers = selectedAnswers.map((answer, index) => index === optionIndex);
      setSelectedAnswers(updatedSelectedAnswers);
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswers(new Array(4).fill(false));
    setIsAnswered(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div className="card p-4" style={{ width: '70vw' }}>
          <h4>{questions[currentQuestionIndex].questionText}</h4>
          <ul className="list-unstyled">
            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                onClick={() => handleAnswerClick(optionIndex)}
                className={`cursor-pointer p-2 mb-2 ${
                  isAnswered
                    ? optionIndex === questions[currentQuestionIndex].correctAnswer
                      ? 'bg-success'
                      : 'bg-danger'
                    : ''
                }`}
              >
                {option}
                {isAnswered && optionIndex === questions[currentQuestionIndex].correctAnswer && ' - Correct Answer'}
              </li>
            ))}
          </ul>
          {isAnswered && (
            <button className="btn btn-primary mt-3" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>
      ) : (
        <p>No more questions</p>
      )}
    </div>
  );
};

export default Questions;
