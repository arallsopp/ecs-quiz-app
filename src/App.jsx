import { useState } from 'react'
import questionsData from './data/questions.json'
import Question from './components/Question'
import {shuffle} from "./utils/shuffle.js";
import './App.css'



function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const questionsToAsk = 3;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

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

  const [questions] = useState(() => shuffle(questionsData.questions));
  console.log('Current score:', score); // This will show updates!

  return (
    <>
    <div className='logo'></div>
      <h1>ECS Health and Safety Quiz</h1>
        { showScore ?
            <div>
                <h2>Quiz Complete!</h2>
                <p>You scored {score} out of {questionsToAsk}</p>
                <p className="percentage">{((score / questionsToAsk) * 100).toFixed(1)}%</p>
                <p>{score >= Math.ceil(questionsToAsk * 0.86) ? 'PASS ✓' : 'FAIL ✗'}</p>
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
  );
}

export default App;