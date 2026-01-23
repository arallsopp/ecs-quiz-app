import {useState} from 'react'
import questionsData from './data/questions.json'
import Question from './components/Question'
import {shuffle} from "./utils/shuffle.js";
import './App.css'
import Countdown from "./components/Countdown.jsx";


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

        // Check if correct and update score
        const correct = questions[currentQuestionIndex].correctAnswer === answerIndex;
        if (correct) setScore(score + 1);

        if(mode === 'exam') {
           handleNextQuestion(); //remember, this handles asynchronously, so score won't be updated immediately.
        }else {
            setShowingFeedback(true);
            // DON'T move to next question yet! You're showing explanation
        }
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

    const handleOutOfTime = () => {
        setShowScore(true);
    }

    console.log('Current score:', score); // This will show updates!

    return (
        <>
            {!quizStarted && <>
                <div className='logo'></div>
                <h1>ECS Health and Safety Quiz</h1>

                <div>
                    <label htmlFor="questionsToAsk">Questions to ask</label>
                    <input id="questionsToAsk"
                           type="number"
                           min="1" max={questionsData.questions.length}
                           value={questionsToAsk}
                           onChange={(event) => {
                               setQuestionsToAsk(parseInt(event.target.value) || 1)}
                           }
                    />
                </div>
                <div>
                    <label htmlFor="mode">Mode</label>
                    <select id="mode" value={mode} onChange={(event) => setMode(event.target.value)}>
                        <option value="practice">Practice</option>
                        <option value="exam">Exam</option>
                    </select>
                </div>

                <button onClick={handleStartQuiz}>Start Quiz</button>
            </>}
            {quizStarted &&
                <>
                    {mode === 'exam' &&
                        <Countdown
                            onComplete={handleOutOfTime}
                            initialSeconds = {timeRemaining}>
                        </Countdown>
                    }
                    <div>{mode}</div>
                    <div onClick={() => {setQuizStarted(false)}}>Quit</div>

                    {showScore ?
                        <div>
                            <h2>Quiz Complete!</h2>
                            <p>You scored {score} out of {questionsToAsk}</p>
                            <p className="percentage">{((score / questionsToAsk) * 100).toFixed(1)}%</p>
                            <p>{score >= Math.ceil(questionsToAsk * 0.86) ? 'You have passed' : 'Sorry. You needed 86% to pass'}</p>
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