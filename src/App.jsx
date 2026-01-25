import {useState} from 'react'
import questionsData from './data/questions.json'
import Question from './components/Question'
import {shuffle} from "./utils/shuffle.js";
import Countdown from "./components/Countdown.jsx";
import icon from './assets/icon.png'
import { saveQuizResult } from './utils/scoreStorage';
import Dashboard from './components/Dashboard';
import { getCategoryFromId } from './utils/getCategory';
import About from './components/About';
import Toggle from './components/Toggle';


function App() {

    // Quiz settings (set on splash screen)
    const [questionsToAsk, setQuestionsToAsk] = useState(8);
    const [mode, setMode] = useState('practice'); // 'practice' or 'exam'

    const [selectedCategories, setSelectedCategories] = useState(
        questionsData.categories.map(cat => cat.id) // All selected by default
    );

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    // Feedback state (only used in practice mode)
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showingFeedback, setShowingFeedback] = useState(false);

    //support finish quiz and history
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizStartTime, setQuizStartTime] = useState(null);

    // Timer state
    const [timeLimit, setTimeLimit] = useState(null);

    // Dashboard state
    const [showDashboard, setShowDashboard] = useState(false);

    //about state
    const [showAbout, setShowAbout] = useState(false);

    const [questions, setQuestions] = useState(questionsData.questions);

    const passingScore = Math.ceil(questionsToAsk * 0.86);
    const passed = score >= passingScore;

    const handleStartQuiz = () => {

        // Filter questions by selected categories
        const filteredQuestions = questionsData.questions
            .map(q => ({
                ...q,
                category: getCategoryFromId(q.id) // Add category here
            }))
            .filter(q => selectedCategories.includes(q.category));

        if (selectedCategories.length === 0) {
            alert('Please select at least one topic');
            return;
        }

        // Shuffle questions
        setQuestions(shuffle([...filteredQuestions]));

        // Avoid issue where user can select more questions than category selection allows
        setQuestionsToAsk(Math.min(questionsToAsk,filteredQuestions.length));

        // Reset everything
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setShowingFeedback(false);

        setQuizAnswers([]); // Reset answers
        setQuizStartTime(Date.now()); // Track start time

        // Set timer if exam mode
        if (mode === 'exam') {
            setTimeLimit(questionsToAsk * 0.6 * 60); // Convert to seconds
        }

        // Start the quiz
        setQuizStarted(true);
    };

    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswer(answerIndex);

        //stash current question for easy access

        const currentQuestion = questions[currentQuestionIndex];
        // Check if correct and update score
        const correct = currentQuestion.correctAnswer === answerIndex;

        // Track this answer
        setQuizAnswers([...quizAnswers, {
            questionId: currentQuestion.id,
            correct,
            category: currentQuestion.category
        }]);

        if (correct) setScore(score + 1);

        if (mode === 'exam') {
            handleNextQuestion(); //remember, this handles asynchronously, so score won't be updated immediately.
        } else {
            setShowingFeedback(true);
            // DON'T move to the next question yet! You're showing explanation
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setShowingFeedback(false);

        const nextQuestion = currentQuestionIndex + 1;
        if ((nextQuestion < questionsToAsk)) {
            //we are either at the end, or there weren't enough questions in the selected categories
            setCurrentQuestionIndex(nextQuestion);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        const timeSpent = mode === 'exam' ? Math.floor((Date.now() - quizStartTime) / 1000) : null;

        // Calculate category scores
        const categoryScores = {};
        quizAnswers.forEach(answer => {
            if (!categoryScores[answer.category]) {
                categoryScores[answer.category] = { correct: 0, total: 0 };
            }
            categoryScores[answer.category].total++;
            if (answer.correct) {
                categoryScores[answer.category].correct++;
            }
        });

        const quizResult = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            mode,
            questionsToAsk,
            score,
            percentage: parseFloat(((score / questionsToAsk) * 100).toFixed(1)),
            passed,
            timeSpent,
            selectedCategories,
            categoryScores,
            answers: quizAnswers
        };

        saveQuizResult(quizResult);
        setShowScore(true);
    };

    return (
        <main role="main">
            {showAbout && <About onClose={() => setShowAbout(false)} />}
            {showDashboard ? (
                <Dashboard onClose={() => setShowDashboard(false)} />
            ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {!quizStarted && (
                <div className="max-w-md sm:max-w-full mx-auto pt-20 md:pt-5 px-4">
                    <img src={icon} alt="ECS" className="w-32 h-32 mx-auto mb-6 md:inline md:w-20 md:h-20" />
                    <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-400 mb-8 md:inline">
                        ECS Health & Safety Quiz
                    </h1>

                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 space-y-4">
                        <div className="mb-4">
                            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Topics to Include </span>
                            <div className="max-h-48 md:max-h-full md:p-2 md:grid md:gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto border border-gray-200 dark:border-gray-700 dark:bg-slate-800 rounded-lg">
                                {questionsData.categories
                                    .map(category => ({
                                        ...category,
                                        questionCount: questionsData.questions.filter(q =>
                                            getCategoryFromId(q.id) === category.id
                                        ).length
                                    }))
                                    .filter(category => category.questionCount > 0)
                                    .map(category => (
                                        <Toggle
                                            key={category.id}
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={(checked) => {
                                                if (checked) {
                                                    setSelectedCategories([...selectedCategories, category.id]);
                                                } else {
                                                    setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                                                }
                                            }}
                                            label={category.name}
                                            count={category.questionCount}
                                        />
                                    ))
                                }
                            </div>

                            <button
                                onClick={() => setSelectedCategories(questionsData.categories.map(c => c.id))}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
                            >
                                Select All
                            </button> |     <button
                                onClick={() => setSelectedCategories([])}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline dark:text-gray-400"
                            >
                                None
                            </button>
                        </div>
                        <div className="sm:grid sm:grid-cols-2 sm:gap-2">
                            <div>
                                <label htmlFor="questionsToAsk"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Number of
                                    Questions </label> <input
                                id="questionsToAsk"
                                type="number"
                                min="1"
                                max={questionsData.questions.length}
                                value={questionsToAsk}
                                onChange={(e) => setQuestionsToAsk(parseInt(e.target.value) || 1)}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white px-4 py-2 sm:h-10"
                            />
                            </div>

                            <div>
                                <label htmlFor="mode"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Mode </label>
                                <select
                                    id="mode"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white px-4 py-2 sm:h-10">
                                    <option value="practice">Practice Mode</option>
                                    <option value="exam">Exam Conditions</option>
                                </select>
                            </div>
                            </div>
                            <button
                            onClick={handleStartQuiz}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            Start Quiz
                        </button>
                        <button
                            onClick={() => setShowDashboard(true)}
                            className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            View Progress Dashboard
                        </button>
                        <button
                            onClick={() => setShowAbout(true)}
                            className="w-full mt-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                            About
                        </button>
                    </div>


                </div>
            )}

            {quizStarted && (
                <div className="min-h-screen flex flex-col">
                    {/* Header Bar */}
                    <div className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                        <div className="max-w-4xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {mode === 'exam' && !showScore && (
                                    <div className="min-w-[40px] sm:min-w-[90px]">
                                        <Countdown
                                            promptClassName="hidden sm:inline "
                                            initialSeconds={timeLimit}
                                            onComplete={() => setShowScore(true)}
                                        />
                                    </div>
                                )} <span className="text-sm text-gray-600">
                                Question {currentQuestionIndex + 1} of {questionsToAsk}
                            </span>
                            </div>

                            <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                                {mode === 'exam' ? 'Exam Mode' : 'Practice Mode'}
                            </span>
                                <button
                                    onClick={() => setQuizStarted(false)}
                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:text-gray-100">
                                    Quit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 px-6 py-8">
                        <div className="max-w-4xl mx-auto">
                            {showScore ? (
                                <div className="bg-white dark:bg-black text-black dark:text-gray-400 rounded-lg shadow-md p-8 text-center">
                                    <h2 className="text-3xl font-bold">Finished</h2>
                                    <div className="text-6xl font-bold mb-4">
                                        {((score / questionsToAsk) * 100).toFixed(1)}%
                                    </div>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                                        You scored {score} out of {questionsToAsk}
                                    </p>
                                    {passed ? (
                                        <p className="text-2xl text-green-600 font-bold mb-6">
                                            ✓ PASS
                                        </p>
                                    ) : (
                                        <p className="text-2xl text-red-600 dark:text-red-800 font-bold mb-6">
                                            { mode === "practice" && <span>In exam conditions, you'd have needed to get { passingScore } correct.</span>}
                                            { mode === "exam" &&  <span>✗ FAIL. You needed 86% ({passingScore}/{questionsToAsk}) to pass</span>}
                                        </p>
                                    )}
                                    <div className="sm:grid sm:grid-cols-2 gap-2">
                                    <button
                                        onClick={() => {
                                            setQuizStarted(false);
                                            setShowDashboard(true);
                                        }}
                                        className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                                    >
                                        View Progress Dashboard
                                    </button>
                                    <button
                                        onClick={() => {
                                            setQuizStarted(false);
                                        }}
                                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                                    >
                                        Back to Home
                                    </button>
                                    </div>
                                </div>
                            ) : (
                                <Question
                                    questionData={questions[currentQuestionIndex]}
                                    onAnswer={handleAnswerClick}
                                    selectedAnswer={selectedAnswer}
                                    showingFeedback={showingFeedback}
                                    onNextQuestion={handleNextQuestion}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
            ) }
        </main>
    );
}

export default App;