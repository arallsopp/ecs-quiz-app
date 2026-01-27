// src/components/Flashcard.jsx
import { useState } from 'react';
import { getCategoryName } from '../utils/getCategory';
import { addPracticeCard, removePracticeCard } from '../utils/scoreStorage';
import { getPracticeCards } from '../utils/scoreStorage';

function Flashcard({ questionData, onNext, currentIndex, total }) {
    const [flipped, setFlipped] = useState(false);
    const isMarkedForPractice = getPracticeCards().includes(questionData.id);

    const handleMark = (gotIt) => {
        if (gotIt) {
            removePracticeCard(questionData.id);
        } else {
            addPracticeCard(questionData.id);
        }

        setFlipped(false);
        onNext();
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Card {currentIndex + 1} of {total}</span>
                <div className="flex items-center gap-2">
                    {isMarkedForPractice && (
                        <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
              📌 Marked
            </span>
                    )}
                    <span className="text-xs">{getCategoryName(questionData.id)}</span>
                </div>
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl min-h-[400px] p-8 flex flex-col justify-center">
                <div className="space-y-6">
                    {/* Question - always visible */}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                        {questionData.question}
                    </h2>

                    {/* Answer options - always visible, but styled differently when flipped */}
                    <div className="space-y-3">
                        {questionData.answers.map((answer, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    flipped && index === questionData.correctAnswer
                                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-900 dark:text-green-100'
                                        : flipped
                                            ? 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                  <span className="font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                                    <span className="flex-1">{answer}</span>
                                    {flipped && index === questionData.correctAnswer && (
                                        <span className="text-green-600 dark:text-green-400 font-bold text-xl">✓</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Explanation - only visible when flipped */}
                    {flipped && questionData.explanation && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                            <p className="text-sm text-blue-900 dark:text-blue-100">
                                <strong>Explanation:</strong> {questionData.explanation}
                            </p>
                        </div>
                    )}

                    {/* Action buttons */}
                    {!flipped ? (
                        <div className="pt-4">
                            <button
                                onClick={() => setFlipped(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                            >
                                Show Answer
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <button
                                onClick={() => handleMark(false)}
                                className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium"
                            >
                                ✗ Need Practice
                            </button>
                            <button
                                onClick={() => handleMark(true)}
                                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                            >
                                ✓ Got It!
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Keyboard hint */}
            {flipped && (
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                    Press 1 for "Need Practice" or 2 for "Got It!"
                </p>
            )}
        </div>
    );
}

export default Flashcard;