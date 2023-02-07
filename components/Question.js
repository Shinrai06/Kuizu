import React, { useEffect, useState } from "react";

export default function Question(props) {
  const { id, question, correct_answer, answers, answered } = props.item;

  const display = answers.map((ans) => {
    return (
      <span
        className={`answer ${
          answered && correct_answer === ans.answer
            ? "green"
            : answered && ans.selected
            ? "red"
            : ""
        } pointer`}
        onClick={() => props.Attempted(id, ans.id)}
      >
        {ans.answer}
      </span>
    );
  });

  return (
    <div className={`template ${answered ? "add" : ""}`}>
      <h2 className="question">{question}</h2>
      <div className={`answers--box ${answered ? "add" : ""}`}>{display}</div>
    </div>
  );
}
