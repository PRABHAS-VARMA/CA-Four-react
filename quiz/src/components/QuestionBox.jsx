import React, { useState, useRef } from 'react';

const QuestionBox = ({ question, presentQuestion, NoOfQues, answerManager, highlight }) => {
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionClick = (optionId) => {
      setSelectedOption(optionId);
      answerManager(optionId);
    };

    const focusQuestion = useRef();

    function handleFocus(){
      focusQuestion.current.style.color = "red";
    }
  
    function handleNoFocus(){
      focusQuestion.current.style.color = "black";
    }
  
    return (
      <div className={`question-box ${highlight ? 'highlighted' : ''}`}>
        <p>Question: {presentQuestion} out of {NoOfQues}</p>
        <h2 ref={focusQuestion}>{question.text}</h2>
        <div className="options">
          {question.options.map((option) => (
            <div  id="opt"
              key={option.id}
              className={`option ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.id)}
            >
              {option.text}
            </div>
          ))}
        </div>
        <button id="high" onClick={handleFocus}>Highlight</button>
        <button id="remove" onClick={handleNoFocus}>Remove Highlight</button>
      </div>
    );
  };
  
  export default QuestionBox;