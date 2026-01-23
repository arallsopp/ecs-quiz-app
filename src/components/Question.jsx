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
        <div className="space-y-6">
            <div>
                <div className="text-sm text-gray-500 mb-2">
                    Category: {questionData.category}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {questionData.question}
                </h2>
            </div>

            <div className="space-y-3">
                {shuffledAnswers.map((answer) => (
                    <button
                        key={answer.originalIndex}
                        className={`
                        px-6 py-4 rounded-lg transition-all w-full text-left font-medium
                        ${!showingFeedback && 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                        ${showingFeedback && answer.originalIndex === questionData.correctAnswer && 'bg-green-100 border-2 border-green-600 text-green-900'}
                        ${showingFeedback && selectedAnswer === answer.originalIndex && selectedAnswer !== questionData.correctAnswer && 'bg-red-100 border-2 border-red-600 text-red-900'}
                        ${showingFeedback && selectedAnswer !== answer.originalIndex && answer.originalIndex !== questionData.correctAnswer && 'bg-gray-50 text-gray-400'}
                    `}
                        disabled={showingFeedback}
                        onClick={() => onAnswer(answer.originalIndex)}
                    >
                        <div className="flex items-center justify-between">
                            <span>{answer.text}</span>
                            {showingFeedback && answer.originalIndex === questionData.correctAnswer && (
                                <span className="text-green-600 text-xl">✓</span>
                            )}
                            {showingFeedback && selectedAnswer === answer.originalIndex && selectedAnswer !== questionData.correctAnswer && (
                                <span className="text-red-600 text-xl">✗</span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {showingFeedback && (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <div className="font-semibold text-blue-900 mb-2">
                        {selectedAnswer === questionData.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    <p className="text-blue-800 text-sm">
                        {questionData.explanation}
                    </p>
                    <button
                        onClick={onNextQuestion}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Continue →
                    </button>
                </div>
            )}
        </div>
    )
}

export default Question