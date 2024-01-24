import React from 'react';

const Result = ({ score, NoOfQues }) => {
  const percentage = (score / NoOfQues) * 100;

  return (
    <div className="result-box">
      <h2>Result!!!</h2>
      <p>{`${score} out of ${NoOfQues} were correct`}</p>
      <p>{`Total Percentage: ${percentage}%`}</p>
    </div>
  );
};

export default Result;
