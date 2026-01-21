
function Question({ questionData, onAnswer }) {
    return (
      <div>
        <h2>{questionData.question}</h2>
        {questionData.answers.map((answer,index) => (
            <button 
            key={index} 
            className="answer"
            onClick={() => {
                console.log('component saw answer click',index);
                onAnswer(index)
            }}>{answer}</button>
        ))}   
      </div>
    )
  }
  
  export default Question
 