// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import questions from "./question.jsx";
import Result from "./components/Result.jsx";
import QuestionBox from "./components/QuestionBox";

const App = () => {
  const [themeName, setThemeName] = useState("dark")
  const [theme, setTheme] = useState(true)
  // const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  // const [highlight, setHighlight] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // const handleDarkModeToggle = () => {
  //   setDarkMode(!darkMode);
  // };

  const handleToggle = ()=>{
    setTheme(theme?false:true);
  }

  function backGroundColors(color){

    document.body.style.backgroundColor = color? "#eae7dc":"#2b2d42";
    return{
      backgroundColor : color? "#eae7dc":"#2b2d42",
    }
  }
  
  function textColor(color){
    return{
      color:color?"#2b2d42":"#eae7dc",
    }
  }

  useEffect(()=>{
    setThemeName(themeName==="light"?"dark":"light")
  },[theme])



  const handleAnswer = (optionId) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion - 1] = optionId;
    setUserAnswers(updatedUserAnswers);

    // Move to the next question if not the last question
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz is finished
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.filter((answer, index) => answer === questions[index].options.findIndex(opt => opt.isCorrect)).length;
  };

  const score = calculateScore();

  // const focusQuestion = useRef();

  // const handleHighlight = () => {
  //   focusQuestion.current.style.color = "red";  }

  // const handleRemoveHighlight = () => {
  //   focusQuestion.current.style.color = "darkblue";
  // }

  const handleReplay = () => {
    setCurrentQuestion(1);
    setUserAnswers(Array(questions.length).fill(null));
    setQuizFinished(false);
  };

  return (
    <div className="page"  style={backGroundColors(theme)}>
      <div className="header">
        <div className="logo" style={textColor(theme)}>Kalvium</div>
        <button id="theme" className="toggle-button" onClick={handleToggle}>
        {themeName}</button>
      </div>

      <div className="app">
        {quizFinished ? (
          <div className="result-popup">
            <Result score={score} totalQuestions={questions.length} />
            <button id="replay" onClick={handleReplay}>
              Replay the Quiz
            </button>
          </div>
        ) : (
          <div>
            <QuestionBox
              question={questions[currentQuestion - 1]}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              handleAnswer={handleAnswer}
              // highlight={highlight}
            />

            {/* <div className="button-container">
              <button class="buttio"id="high" onClick={handleHighlight}>
                Highlight
              </button>
              <button  class="buttio"  id="remove" onClick={handleRemoveHighlight}>
                Remove Highlight
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
