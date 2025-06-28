import { useState } from 'react'
import './App.css'

const Faqitem=({question,answer})=>{
  const [show,setShow]=useState(false);

  const toggleshow=()=>{
    setShow(!show);
  }

  return(
    <div className={`faq-item ${show?"active" :""}`}>
      <div className='faq-item-header' onClick={toggleshow}>{question}
      </div>
      {show&&(<div className='faq-item-body'>
        <div className='faq-item-body-content'>
          {answer}
        </div>
      </div>)}
    </div>
  );
};
const Faqaccordion=({data})=>{
return (
  <>
  <div className='faq-accordion'>
  <h2>FAQs</h2>
   {data.map((item)=><Faqitem key={item.id} question={item.question} answer={item.answer}/>)}
  </div>
  </>
)
};
const data=[
  { id:1,question:"What is React?",answer:"React is a front-end JavaScript library for building user interfaces or UI components"},
  {id:2,question:"What are the benefits of React",answer:"Some of the benefits of React are :it is fast,scalable,modular,easy to debug,and supports server-side rendering"},
  {id:3,question:"What are the main concepts of React?",answer:"some of the main concepts of React are: components,props,state,hooks,lifecycle methods,and JSx" }
];
function App() {

  return (
  <div className='app'>
    <Faqaccordion data={data}/>
  </div>
  )
}

export default App
