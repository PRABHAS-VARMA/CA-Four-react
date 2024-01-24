import React, { useEffect, useState } from "react";
import "./App.css";
import questions from "./question.jsx";
import Result from "./components/Result.jsx";
import QuestionBox from "./components/QuestionBox";

const App = () => {
  const [version, setThemeVersion] = useState("dark")
  const [theme, setTheme] = useState(true)
  const [presentQuestion, setPresentQuestion] = useState(1);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [quizdone, quizDone] = useState(false);


  const versionManager = ()=>{
    setTheme(theme?false:true);
  }

  function pageColor(color){

    document.body.style.backgroundColor = color? "#eae7dc":"#2b2d42";
    return{
      backgroundColor : color? "#eae7dc":"#2b2d42",
    }
  }
  
  function questionTextColorChange(color){
    return{
      color:color?"#2b2d42":"#eae7dc",
    }
  }

  useEffect(()=>{
    setThemeVersion(version==="light"?"dark":"light")
  },[theme])



  const answerManager = (x) => {
    const refreshedAnswer = [...userAnswers];
    refreshedAnswer[presentQuestion - 1] = x;
    setUserAnswers(refreshedAnswer);

    if (presentQuestion < questions.length) {
      setPresentQuestion(presentQuestion + 1);
    } else {
      quizDone(true);
    }
  };

  const scoreUpdater = () => {
    return userAnswers.filter((answer, index) => answer === questions[index].options.findIndex(opt => opt.isCorrect)).length;
  };

  const score = scoreUpdater();

  const handleReplay = () => {
    setPresentQuestion(1);
    setUserAnswers(Array(questions.length).fill(null));
    quizDone(false);
  };

  return (
    <div className="page"  style={pageColor(theme)}>
      <div className="header">
        <div className="headin" style={questionTextColorChange(theme)}>Kalvium</div>
        <button id="theme" className="toggle-button" onClick={versionManager}>
        {version}</button>
      </div>

      <div className="app">
        {quizdone ? (
          <div className="Finalresult">
            <Result score={score} NoOfQues={questions.length} />
            <button id="replay" onClick={handleReplay}>
              Replay the Quiz
            </button>
          </div>
        ) : (
          <div>
            <QuestionBox
              question={questions[presentQuestion - 1]}
              presentQuestion={presentQuestion}
              NoOfQues={questions.length}
              answerManager={answerManager}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
