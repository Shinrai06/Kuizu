import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

export default function App() {
  const [home, setHome] = useState(true);
  function displayQuiz() {
    setHome((prev) => false);
  }
  function displayHome() {
    setHome((prev) => true);
  }

  return (
    <div className="main">
      {home ? <Home change={displayQuiz} /> : <Quiz change={displayHome} />}
    </div>
  );
}

// <Quiz change={displayHome}/>
