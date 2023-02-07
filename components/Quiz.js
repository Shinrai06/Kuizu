import React, { useState, useEffect } from "react";
import he from "he";
import Question from "./Question";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Quiz(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false); // display after selecting show button
  const [load, setLoad] = useState(false); // after fetching the data to display questions
  const [done, setDone] = useState(false); // to display Result
  const [count, setCount] = useState(0);

  const [questions, setQuestions] = useState([
    {
      id: ``,
      question: ``,
      answers: [],
      answered: false,
    },
  ]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function getQuestions() {
    setCount(0);
    setDone(false);
    setShow((prevState) => !prevState);
    setQuestions((prevState) => {
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        let D = data[i];
        temp.push({
          id: uuidv4(),
          question: he.decode(D.question),
          correct_answer: D.correct_answer,
          answers: shuffle(
            [...D.incorrect_answers, D.correct_answer].map((item) => ({
              id: uuidv4(),
              selected: false,
              answer: he.decode(item),
            }))
          ),
          answered: false,
        });
      }
      return temp;
    });
  }

  function Attempted(id, AnsId) {
    setQuestions((prevState) =>
      prevState.map((Q) =>
        Q.id === id && !Q.answered
          ? {
              id: Q.id,
              question: Q.question,
              correct_answer: Q.correct_answer,
              answered: true,
              answers: Q.answers.map((ans) => {
                if (ans.id === AnsId) {
                  if (ans.answer == Q.correct_answer) {
                    setCount((prevState) => prevState + 1);
                  }
                  return { id: ans.id, answer: ans.answer, selected: true };
                }
                return ans;
              }),
            }
          : Q
      )
    );
  }

  function submit() {
    setDone(true);
    setShow(false);
    if (count > (localStorage.Highest ? localStorage.Highest : 0)) {
      localStorage.Highest = count;
    }
  }

  const QuestionElements = questions.map((item) => {
    return (
      <Question key={item.id.toString()} item={item} Attempted={Attempted} />
    );
  });

  function Ele() {
    return (
      <div>
        {!done ? <h1> Welcome!!! </h1> : <h1> Try Again!!! </h1>}
        <br />
        {load ? (
          <button className="btn pointer" onClick={getQuestions}>
            Show Questions
          </button>
        ) : (
          <h2 className="wait">Wait</h2>
        )}
      </div>
    );
  }

  function Result() {
    const { width, height } = useWindowSize();
    return (
      <div>
        <Confetti width={width} height={height} />
        <h3>Score : </h3>
        <span>
          {count}/{data.length}
        </span>
      </div>
    );
  }

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .then((res) => res.json())
      .then((receivedData) => {
        setLoad(true);
        setData(receivedData.results);
      });
  }, []);

  return (
    <div>
      {!show ? <Ele /> : <div>{QuestionElements}</div>}

      {done ? (
        <button className="btn pointer" onClick={props.change}>
          Home Page
        </button>
      ) : (
        <button className="btn pointer" onClick={submit}>
          Submit
        </button>
      )}
      {done ? <Result /> : ""}
    </div>
  );
}
