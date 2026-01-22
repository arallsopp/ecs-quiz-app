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

    return (
        <div>
            <small>Question: {questionData.id}</small>
            <h2>{questionData.question}</h2>
            {shuffledAnswers.map((answer) => (
                <button
                    key={answer.originalIndex}
                    className={`answer 
                ${selectedAnswer === answer.originalIndex ? 'chosen' : ''}
                ${showingFeedback && answer.originalIndex === questionData.correctAnswer ? 'correct' : ''}
                ${showingFeedback && selectedAnswer === answer.originalIndex && selectedAnswer !== questionData.correctAnswer ? 'wrong' : ''}
            `}
                    disabled={showingFeedback}
                    onClick={() => onAnswer(answer.originalIndex)}
                >
                    {answer.text}
                </button>
            ))}

            {showingFeedback && (
                <div>
                    <p>{selectedAnswer === questionData.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</p>
                    <p className="explanation">{questionData.explanation}</p>
                    <button onClick={onNextQuestion}>Next Question</button>
                </div>
            )}
        </div>
    )
}

export default Question