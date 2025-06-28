import { useState,useEffect } from 'react'
import './App.css'
import QuestionData from "./Questions.json"

function App() {
  const [currentquestion,setCurrentquestion]=useState(0);
  const [score,setScore]=useState(0);
  const[showscore,setShowscore]=useState(false);
  const[timer,setTimer]=useState(10);

  const handleanswerclick=(selectedoption)=>{
  if(selectedoption===QuestionData[currentquestion].correctOption)
    {
    setScore((prevscore)=>prevscore+1);
    }
  if(currentquestion<QuestionData.length-1){
    setCurrentquestion((prevques)=>prevques+1);
    setTimer(10);
  }
  else{
    setShowscore(true);
  }
  };

  const restart=()=>{
  setScore(0);
  setCurrentquestion(0);
  setShowscore(false);
  setTimer(10);
  };
  
  useEffect(()=>{
    let interval;
    if(timer>0 && !showscore){
     interval=setInterval(() => {
      setTimer((prevtime)=>prevtime-1);
    }, 1000);
    }
    else{
      clearInterval(interval);
      setShowscore(true);
    }
    return ()=>clearInterval(interval);
  },[timer,showscore])
  return (
    <>
    <div className='quiz-app'>
     {showscore?(<div className='score-section' >
        <h2>Your Score:{score}/{QuestionData.length}</h2>
        <button onClick={restart}>Restart</button>
      </div>):(<div className='question-section'>
        <h2>Question {currentquestion+1}</h2>
        <p>{QuestionData[currentquestion].question}</p>
        <div className='options'>
       {QuestionData[currentquestion].options.map((option,index)=>(<button onClick={()=>handleanswerclick(option)} key={index}>{option}</button>))}
        </div>
        <div className='timer'>
          Time Left:<span>{timer}S</span>
        </div>
      </div>)}

    </div>
    </>
  )
}

export default App
