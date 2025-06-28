import { useState } from 'react'
import './App.css'
import left_arrow from "./assets/arrow-left-circle-fill.svg"
import right_arrow from "./assets/arrow-right-circle-fill.svg"

const daysOfWeek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

function App() {
  const [selecteddate,setSelecteddate]=useState(new Date());

  const daysInMonth=()=>{
    const daysArray=[];
    const firstDay=new Date(selecteddate.getFullYear(),selecteddate.getMonth(),1);
    const lastDay=new Date(selecteddate.getFullYear(),selecteddate.getMonth()+1,0);

    for(let i=0;i<firstDay.getDay();i++){
      daysArray.push(null);
    }
    for(let i=1;i<=lastDay.getDate();i++){
      daysArray.push(new Date(selecteddate.getFullYear(),selecteddate.getMonth(),i));
    }
    return daysArray;
  };

  const changemonth=(e)=>{
    const newmonth=parseInt(e.target.value,10);
    setSelecteddate(new Date(selecteddate.getFullYear(),newmonth,1));
  };

  const changeyear=(e)=>{
  const newyear=parseInt(e.target.value,10);
  setSelecteddate(new Date(newyear,selecteddate.getMonth(),1));
  };

  const issameday=(date1,date2)=>{
    return date1.getDate()===date2.getDate() &&  date1.getMonth()===date2.getMonth() && date1.getFullYear()===date2.getFullYear();
  };

  return (
    <>
    <div className='calendar'>
      <div className='header'>
        <button onClick={()=>{setSelecteddate(new Date(selecteddate.getFullYear(),selecteddate.getMonth()-1,1));
        }}>
          <img src={left_arrow}  />
        </button>
        <select value={selecteddate.getMonth()} onChange={changemonth}>
          {
            months.map((months,index)=>(<option key={index} value={index}>{months}</option>))
          }
        </select>
        <select value={selecteddate.getFullYear()} onChange={changeyear}>
          {
            Array.from({length:10},(_,i)=>selecteddate.getFullYear()-5+i).map((year)=>(<option key={year} value={year}>{year}</option>))
          }
        </select>
        <button onClick={()=>{setSelecteddate(new Date(selecteddate.getFullYear(),selecteddate.getMonth()+1,1));
        }}>
        <img src={right_arrow} />
        </button>
      </div>
      <div className='daysofweek'>
        {daysOfWeek.map((day)=>(<div key={day}>{day}</div>))}
      </div>
      <div className='days'>
        {daysInMonth().map((day,index)=>(<div key={index} className={day? (issameday(day,new Date()) )?"day current":"day":"empty"}>
        {day?day.getDate():""}</div>))}
      </div>
    </div>
    </>
  )
}

export default App
