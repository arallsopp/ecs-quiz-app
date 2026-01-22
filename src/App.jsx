import { useState } from 'react'
import questionsData from './data/questions.json'
import Question from './components/Question'
import './App.css'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  
  console.log('Current score:', score); // This will show updates!

  const handleAnswerClick = (answerIndex) => {
    const correct = (questionsData.questions[currentQuestionIndex].correctAnswer === answerIndex);
    if(correct){
      setScore(score + 1);
      const nextQuestion = currentQuestionIndex + 1;
      if(nextQuestion < questionsData.questions.length){
        setCurrentQuestionIndex(nextQuestion);
      }else{
        console.log('end of questions');
        setShowScore(true);
      }
    }
    console.log('answered', answerIndex, correct ? 'yes':'no');
  };

  console.log('Questions loaded',questionsData);

  return (
    <>
    <div className='logo'></div>
      <h1>ECS Health and Safety Quiz</h1>
      { showScore ? 
        <p>End of quiz. Score is { score }</p>
      : <Question 
        questionData={questionsData.questions[currentQuestionIndex]}
        onAnswer={handleAnswerClick}
        />
      }
    </>
  );
}

export default App;