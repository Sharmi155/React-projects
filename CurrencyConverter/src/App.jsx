import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const [amount,setAmount]=useState(1);
  const [fromcurrency,setFromcurrency]=useState("USD");
  const [tocurrency,setTocurrency]=useState("INR");
  const [convertedamount,setConvertedamount]=useState(null);
  const [exchangerate,setExchangerate]=useState(null);

  const handleamountchange=(e)=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value)?0:value);

  }

  useEffect(()=>{
    const getexchangerate=async ()=>{
    try{
      let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
      const response=await axios.get(url)
      setExchangerate(response.data.rates[tocurrency])
     }
   catch(error){
      console.log("error",error )
   }
    };
    getexchangerate();
  },[fromcurrency,tocurrency]);


  const handlefrom=(e)=>{
   setFromcurrency(e.target.value)

  }

  const handleto=(e)=>{
    setTocurrency(e.target.value)
  }

 useEffect(()=>{
  if(exchangerate !== null){
    setConvertedamount((amount*exchangerate).toFixed(2));
  }
 },[amount,exchangerate]);

  return (
    <>
    <div className='currency-converter'>
      <div className='box'></div>
      <div className='data'>
        <h1>CURRENCY CONVERTER</h1>
        <div className='input-container'>
          <label htmlFor="amt">Amount:</label>
          <input type="number" onChange={handleamountchange} id="amt" value={amount}/>
        </div>
        <div className='input-container'>
          <label htmlFor="fromcurrency">From Currency:</label>
          <select id="fromcurrency" value={fromcurrency} onChange={handlefrom}>
            <option value="USD">USD-united states Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japanese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinese Yuan</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South African Rand</option>
          </select>
        </div>
        <div className='input-container'>
          <label htmlFor="tocurrency">To Currency:</label>
          <select id="tocurrency" value={tocurrency} onChange={handleto}>
            <option value="USD">USD-united states Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japanese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinese Yuan</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South African Rand</option>
          </select>
        </div>
        <div className='result'>
          <p>{amount}{fromcurrency} is equal to {convertedamount} {tocurrency}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
