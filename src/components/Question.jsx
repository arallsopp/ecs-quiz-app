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
                    className={`
                        px-4 py-2 rounded-lg transition-colors w-full text-left mb-2
                        ${!showingFeedback && 'bg-gray-700 text-white hover:bg-gray-600'}
                        ${showingFeedback && answer.originalIndex === questionData.correctAnswer && 'bg-green-600 text-white'}
                        ${showingFeedback && selectedAnswer === answer.originalIndex && selectedAnswer !== questionData.correctAnswer && 'bg-red-600 text-white'}
                        ${showingFeedback && selectedAnswer !== answer.originalIndex && answer.originalIndex !== questionData.correctAnswer && 'bg-gray-300 text-gray-500'}
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