import { useState } from "react";


// Fisher–Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function Question({ questionData, onAnswer }) {
    
    //shuffle answers once
    const [shuffledAnswers] = useState(() => {
        const withIndex = questionData.answers.map((text, index) => ({
            text,
            originalIndex: index
        }));
        shuffle(withIndex);
        return withIndex;    
    })


    return (
      <div>
        <small>Question: {questionData.id}</small>
        <h2>{questionData.question}</h2>
        {shuffledAnswers.map((answer) => (
            <button 
            key={answer.originalIndex} 
            className="answer"
            onClick={() => {
                console.log('component saw answer click',answer.originalIndex);
                onAnswer(answer.originalIndex)
            }}>{answer.text}</button>
        ))}   
      </div>
    )
  }
  
  export default Question
 