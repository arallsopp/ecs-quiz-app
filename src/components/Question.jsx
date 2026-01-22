import { useState } from "react";
import {shuffle} from "../utils/shuffle.js";


function Question({ questionData, onAnswer, selectedAnswer, showingFeedback, onNextQuestion }) {
    
    //shuffle answers once? No, I want to do this when render happens, I think?
    const [shuffledAnswers] = useState(() => {
        const withIndex = questionData.answers.map((text, index) => ({
            text,
            originalIndex: index
        }));
        return shuffle(withIndex);
    })
    console.log('rendering!');

    return (
      <div>
        <small>Question: {questionData.id}</small>
        <h2>{questionData.question}</h2>
        {shuffledAnswers.map((answer) => (
            <button 
            key={answer.originalIndex} 
            className={`answer 
                ${selectedAnswer === answer.originalIndex ? 'chosen' : ''}
                ${ (showingFeedback ?
                    (answer.originalIndex === questionData.correctAnswer) ? 'correct' : 'wrong'
                    : '')}
                `}
            disabled ={showingFeedback}
            onClick={() => {
                console.log('component saw answer click',answer.originalIndex);
                onAnswer(answer.originalIndex)
            }}>{answer.text}</button>
        ))}

          {showingFeedback ?
              <button onClick={() => {
                  onNextQuestion() //go to next question
              }}>Next Question</button> : null}
      </div>
    )
  }
  
  export default Question
 