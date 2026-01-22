import {useState} from 'react'
import questionsData from './data/questions.json'
import Question from './components/Question'
import {shuffle} from "./utils/shuffle.js";
import './App.css'


function App() {

    // Quiz settings (set on splash screen)
    const [questionsToAsk, setQuestionsToAsk] = useState(3);
    const [mode, setMode] = useState('practice'); // 'practice' or 'exam'

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    // Feedback state (only used in practice mode)
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showingFeedback, setShowingFeedback] = useState(false);

    // Timer state
    const [timeRemaining, setTimeRemaining] = useState(null);

    const [questions, setQuestions] = useState(questionsData.questions);

    const handleStartQuiz = () => {
        // Shuffle questions
        setQuestions(shuffle([...questionsData.questions]));

        // Reset everything
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setShowingFeedback(false);

        // Set timer if exam mode
        if (mode === 'exam') {
            setTimeRemaining(questionsToAsk * 0.6 * 60); // Convert to seconds
        }

        // Start the quiz
        setQuizStarted(true);
    };

    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        setShowingFeedback(true);

        // Check if correct and update score
        const correct = questions[currentQuestionIndex].correctAnswer === answerIndex;
        if (correct) setScore(score + 1);

        // DON'T move to next question yet!
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setShowingFeedback(false);

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questionsToAsk) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    console.log('Current score:', score); // This will show updates!

    return (
        <>
            {!quizStarted && <button onClick={handleStartQuiz}>Start Quiz</button>}
            {quizStarted &&
                <>
                    <div className='logo'></div>
                    <h1>ECS Health and Safety Quiz</h1>
                    {showScore ?
                        <div>
                            <h2>Quiz Complete!</h2>
                            <p>You scored {score} out of {questionsToAsk}</p>
                            <p className="percentage">{((score / questionsToAsk) * 100).toFixed(1)}%</p>
                            <p>{score >= Math.ceil(questionsToAsk * 0.86) ? 'You have passed' : 'You need 86% to pass'}</p>
                            <button onClick={() => setQuizStarted(false)}>Back to Splash</button>
                        </div>
                        : <Question
                            questionData={questions[currentQuestionIndex]}
                            onAnswer={handleAnswerClick}
                            selectedAnswer={selectedAnswer}
                            showingFeedback={showingFeedback}
                            onNextQuestion={handleNextQuestion}
                        />
                    }
                </>
            }
        </>
    );
}

export default App;