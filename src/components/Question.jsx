import { useMemo } from "react";
import {shuffle} from "../utils/shuffle.js";

function Question({ questionData, onAnswer, selectedAnswer, showingFeedback, onNextQuestion }) {

    // Memo-ize the shuffled answers - only recalculate when questionData changes
    const shuffledAnswers = useMemo(() => {
        const withIndex = questionData.answers.map((text, index) => ({
            text,
            originalIndex: index
        }));
        return shuffle(withIndex);
    }, [questionData]);

    return (
        <div>
            <small>Question: {questionData.id}</small>
            <h2>{questionData.question}</h2>
            {shuffledAnswers.map((answer) => (
                <button
                    key={answer.originalIndex}
                    className={`px-4 py-2 bg-gray-700 text-white rounded-lg answer hover:bg-gray-600
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
                    <p>{selectedAnswer === questionData.correctAnswer ? 'Correct. ' : 'Wrong'}</p>
                    <p className="explanation">{questionData.explanation}</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={onNextQuestion}>Continue</button>
                </div>
            )}
        </div>
    )
}

export default Question