import React from "react"

export default function Home(props){
    
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Online Quiz System (OQS), is a web–based quiz system; a system that can be used by lecturers to evaluate students effectively, efficiently and perfectly. The purpose of Online Quiz System is to save lecturer's time since the answers are automatically marked.
            </p>
            <button className="btn" onClick={props.change}>Open Quiz Portal</button>
            {localStorage.Highest && <h1>Highest Score: {localStorage.Highest}</h1>}
        </div>
    )
}