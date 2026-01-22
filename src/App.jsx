import { useState } from 'react'
import questionsData from './data/questions.json'
import Question from './components/Question'
import './App.css'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)


  const handleAnswerClick = (answerIndex) => {
    const correct = (questionsData.questions[currentQuestionIndex].correctAnswer === answerIndex);
    console.log('answered', answerIndex, correct ? 'yes':'no');
  };

  console.log('Questions loaded',questionsData);

  return (
    <>
    <div className='logo'></div>
      <h1>ECS Health and Safety Quiz</h1>
      <Question 
        questionData={questionsData.questions[currentQuestionIndex]}
        onAnswer={handleAnswerClick}
        />
    </>
  );
}

export default App;