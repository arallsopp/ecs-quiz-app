import { useState } from 'react';
import { getQuizStats, getQuizHistory, clearQuizHistory } from '../utils/scoreStorage';

function Dashboard({ onClose }) {
    const [history, setHistory] = useState(() => getQuizHistory());
    const [stats, setStats] = useState(() => getQuizStats());

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all quiz history?')) {
            clearQuizHistory();
            setHistory([]);
            setStats(null);
        }
    };

    if (!stats) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-600">No quiz history yet. Take a quiz to see your stats!</p>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Start a Quiz
                    </button>
                </div>
            </div>
        );
    }
    console.log(stats.trend);
    return (
        <div className="dark:bg-black max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Your Progress Dashboard</h1>
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900"
                >
                    ✕ Close
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-sm text-gray-600">Total Quizzes</div>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalQuizzes}</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-sm text-gray-600">Questions Answered</div>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalQuestions}</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-sm text-gray-600">Average Score</div>
                    <div className="text-3xl font-bold text-blue-600">{stats.averagePercentage}%</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-sm text-gray-600">Pass Rate</div>
                    <div className="text-3xl font-bold text-green-600">{stats.passRate}%</div>
                </div>
            </div>

            {/* Progress Chart --now using a fixed height container, still not working*/}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Progress</h2>
                <div className="h-64 flex items-end justify-around gap-2 mb-8">
                    {stats.trend.map((point, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
                            <div
                                className="w-full bg-blue-600 dark:bg-blue-500 rounded-t transition-all hover:bg-blue-700 dark:hover:bg-blue-600"
                                style={{ height: `${point.percentage}%` }}
                                title={`${point.percentage}%`}
                            />
                            <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                {point.date}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Performance by Category</h2>
                <div className="space-y-3">
                    {stats.categoryPercentages.map((cat) => (
                        <div key={cat.category}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium capitalize">{cat.category}</span>
                                <span className="text-gray-600">{cat.correct}/{cat.total} ({cat.percentage}%)</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all ${
                                        cat.percentage >= 86 ? 'bg-green-500' :
                                            cat.percentage >= 70 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                    }`}
                                    style={{ width: `${cat.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-800 font-medium">Strongest Category</div>
                        <div className="text-lg font-bold text-green-900 capitalize">
                            {stats.strongestCategory.category}
                        </div>
                        <div className="text-sm text-green-700">
                            {stats.strongestCategory.percentage}% correct
                        </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-sm text-orange-800 font-medium">Needs Practice</div>
                        <div className="text-lg font-bold text-orange-900 capitalize">
                            {stats.weakestCategory.category}
                        </div>
                        <div className="text-sm text-orange-700">
                            {stats.weakestCategory.percentage}% correct
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Quizzes */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Quizzes</h2>
                <div className="space-y-2">
                    {history.slice(-10).reverse().map(quiz => (
                        <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {new Date(quiz.timestamp).toLocaleString()}
                </span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {quiz.mode}
                </span>
                                <span className="text-sm">
                  {quiz.score}/{quiz.questionsToAsk} questions
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${quiz.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {quiz.percentage}%
                </span>
                                <span>{quiz.passed ? '✓' : '✗'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
                <button
                    onClick={handleClearHistory}
                    className="text-red-600 hover:text-red-700 text-sm"
                >
                    Clear All History
                </button>
                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                    Take Another Quiz
                </button>
            </div>
        </div>
    );
}

export default Dashboard;