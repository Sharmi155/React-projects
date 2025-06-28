import { useState,useEffect } from 'react'
import './App.css'
import { use } from 'react'

function App() {
  const [currenttime,setCurrenttime]=useState(new Date());
useEffect(()=>{
  const timer=setInterval(()=>{
    setCurrenttime(new Date());
  },1000)
  return ()=>clearInterval(timer);
},[])

const formatR=(hour)=>{
  return hour===0?12:hour>12?hour-12:hour
}
const formattimewithleadingzero=(num)=>{
return num<10?`0${num}`:num;
}
const formatdate=(date)=>{
  const options={weekday:"long",year:"numeric",month:"long", day:"numeric"}
  return date.toLocaleDateString(undefined,options)
}
  return (
    <>
    <div className='digitalclock'>
      <h1>DIGITAL CLOCK</h1>
      <div className='time'>{formattimewithleadingzero(formatR(currenttime.getHours()))}:{formattimewithleadingzero(currenttime.getMinutes())}:{formattimewithleadingzero(currenttime.getSeconds())}
      {currenttime.getHours()>=12?" PM":" AM"}
      </div>
      <div className='date'>{formatdate(currenttime)}</div>
    </div>
    </>
  )
}

export default App
