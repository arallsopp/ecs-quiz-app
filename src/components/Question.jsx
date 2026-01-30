import { useMemo, useEffect } from "react";
import {shuffle} from "../utils/shuffle.js";
import {getCategoryName} from "../utils/getCategory.jsx";

function Question({ questionData, onAnswer, selectedAnswer, showingFeedback, onNextQuestion }) {

    // Memo-ize the shuffled answers - only recalculate when questionData changes
    const shuffledAnswers = useMemo(() => {
        const withIndex = questionData.answers.map((text, index) => ({
            text,
            originalIndex: index
        }));
        return shuffle(withIndex);
    }, [questionData]);

    // allow key:enter to hit the continue button, if we are showing it.
    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === 'Enter' && showingFeedback) {
                onNextQuestion();
            }
        };
        document.addEventListener('keydown', handleEnter);
        return () => document.removeEventListener('keydown', handleEnter);
    }, [onNextQuestion, showingFeedback]);

    return (
        <div className="space-y-6">
            <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    { getCategoryName(questionData.id)}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-200">
                    {questionData.question}
                </h2>
            </div>

            <div className="space-y-3">
                {shuffledAnswers.map((answer) => (
                    <button
                        key={answer.originalIndex}
                        className={`
                            px-3 py-2 sm:px-6 sm:py-4 rounded-lg transition-colors w-full text-left font-medium
                            border-2 
                            ${!showingFeedback && 'border-transparent bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300'}
                            ${showingFeedback && answer.originalIndex === questionData.correctAnswer && 'bg-success-100 dark:bg-success-950 border-success-600 text-success-900 dark:text-success-100'}
                            ${showingFeedback && selectedAnswer === answer.originalIndex && selectedAnswer !== questionData.correctAnswer && 'bg-danger-100 dark:bg-danger-950 border-danger-600 text-danger-900 dark:text-danger-100'}
                            ${showingFeedback && selectedAnswer !== answer.originalIndex && answer.originalIndex !== questionData.correctAnswer && 'dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-400 dark:text-gray-600'}
                        `}
                        disabled={showingFeedback}
                        onClick={() => onAnswer(answer.originalIndex)}
                    >
                        <div className="flex items-center justify-between">
                            <span>{answer.text}</span>
                            {showingFeedback && answer.originalIndex === questionData.correctAnswer && (
                                <span className="text-success-600 dark:text-success-400">✓</span>
                            )}
                            {showingFeedback && selectedAnswer === answer.originalIndex && selectedAnswer !== questionData.correctAnswer && (
                                <span className="text-danger-600 dark-text-danger-400">✗</span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {showingFeedback && (
                <div className="bg-primary-100 dark:bg-primary-950 border-l-4 border-primary-600 p-4 rounded">
                    <div className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                        {selectedAnswer === questionData.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    <p className=" text-primary-800 dark:text-blue-200 text-sm">
                        {questionData.explanation}
                    </p>
                    <button
                        onClick={onNextQuestion}
                        className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
                    >
                        Continue →
                    </button>
                </div>
            )}
        </div>
    )
}

export default Question