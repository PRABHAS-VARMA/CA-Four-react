import React from 'react';

const Result = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="result-box">
      <h2>Your Result</h2>
      <p>{`You scored ${score} out of ${totalQuestions}`}</p>
      <p>{`Percentage: ${percentage}%`}</p>
    </div>
  );
};

export default Result;
