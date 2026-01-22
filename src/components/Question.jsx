import { useState, useEffect } from "react";
import {shuffle} from "../utils/shuffle.js";


function Question({ questionData, onAnswer, selectedAnswer, showingFeedback, onNextQuestion }) {

    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // Re-shuffle whenever questionData changes
    useEffect(() => {
        const withIndex = questionData.answers.map((text, index) => ({
            text,
            originalIndex: index
        }));
        setShuffledAnswers(shuffle(withIndex));
    }, [questionData]); // Re-run when questionData changes
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
 