import { useState } from 'react'


function App() {
  
  const [height,setHeight]=useState("");
  const [weight,setWeight]=useState("");
  const [bmi,setBmi]=useState(null);
  const [bmistatus,setBmistatus]=useState("");
  const [errmsg,setErrmsg]=useState("");
  const calculatebmi=()=>{
    const isvalidheight=/^\d+$/.test(height);
    const isvalidweight=/^\d+$/.test(weight);

    if( isvalidheight && isvalidweight)
    {
      const heightInMeters=height/100;
      const bmivalue=weight/(heightInMeters**2);
      setBmi(bmivalue.toFixed(2));
      if(bmivalue<18.5)
      {
        setBmistatus("Under Weight");
      }
      else if( bmivalue>=18.5 && bmivalue<24.9){
        setBmistatus("Normal Weight");
      }
      else if(bmivalue>=25 && bmivalue<29.9){
       setBmistatus("Over Weight");
      }
      else{
        setBmistatus("Obese")
      }
      setErrmsg("");
    }
    else{
    setBmi(null);
    setBmistatus(" ");
    setErrmsg("Please enter a valid number values for height and weight");
    }
  }
  const clearall=()=>{
    setBmi(null);
    setHeight("");
    setWeight("");
    setBmistatus(null)
  }
    return (<>
  <div className='bmi-calculator'>
    <div className='box'></div>
    <div className='data'>
      <h1>BMI CALCULATOR</h1>
      {errmsg && (<p className='error'>{errmsg}</p>)}
      <div className='input-container'>
        <label htmlFor='height'>Height (cm):</label>
        <input type='number' id='height' value={height}  onChange={(e)=>setHeight(e.target.value)} placeholder='Enter the Height '/>
      </div> 
      <div className='input-container'>
        <label htmlFor='weight'>Weight (kg):</label>
        <input type='number' id='weight' value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder='Enter the weight '/>
      </div> 
      <button onClick={calculatebmi}>Calculate BMI</button>
      <button onClick={clearall}>Clear</button>

     {bmi !== null && (
            <div className='result'>
            <p> Your BMI is :{bmi}</p>
            <p>status:{bmistatus}</p>
        </div>
     )}
    </div>
  </div>
  </>)
}

export default App
