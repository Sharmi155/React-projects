import React, { useState } from 'react'

export const PasswordGenerator = () => {
    const [length,setLength]=useState(8);
    const [includeupper,setIncludeupper]=useState(false);
    const [includelower,setIncludelower]=useState(false);
    const [includenumber,setIncludenumber]=useState(false);
    const [includespecial,setIncludespecial]=useState(false);
    const [password,setPassword]=useState("");

  const generate=()=>{
    let charset="";
    if(includeupper) charset +="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(includelower) charset +="abcdefghijklmnopqrstuvwxyz";
    if(includenumber) charset +="01234567890";
    if(includespecial) charset += "!@#$%^&*()_+=-";
    if (!charset) {
        setPassword("Select at least one option");
        return;
      }
    let generatedPassword="";
    for(let i=0;i<length;i++)
    {
        const randomIndex=Math.floor(Math.random()*charset.length);
        generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  }
const copytocb=()=>{
    navigator.clipboard.writeText(password);
    alert("password copied");
}

  return (
    <>
    <div className='password-generator'>
        <h2>STRONG PASSWORD GENERATOR</h2>
        <div className='input-group'>
            <label htmlFor='num' >Password Length:</label> 
            <input type='number' value={length} onChange={(e)=>setLength(parseInt(e.target.value))} id='num'/>
        </div>
        <div className='checkbox-group'>
            <input type='checkbox' checked={includeupper} id="upper" onChange={(e)=>{setIncludeupper(e.target.checked)}}/>
            <label htmlFor='upper'>Include UpperCase</label>
        </div>

        <div className='checkbox-group'>
            <input type='checkbox'checked={includelower} id='lower' onChange={(e)=>{setIncludelower(e.target.checked)}}/>
            <label htmlFor='lower'>Include LowerCase</label>
        </div>
        <div className='checkbox-group'>
            <input type='checkbox'checked={includenumber} id='number'  onChange={(e)=>{setIncludenumber(e.target.checked)}}/>
            <label htmlFor='number'>Include Number</label>
        </div>
        <div className='checkbox-group'>
            <input type='checkbox'checked={includespecial} id='special'  onChange={(e)=>{setIncludespecial(e.target.checked)}}/>
            <label htmlFor='special'>Include Special Characters</label>
        </div>
        <button className='generate-btn' onClick={generate}>Generate Password</button>
        <div className='generated-password'>
            <input type="text" readOnly value={password}></input>
            <button className='copy-btn' onClick={copytocb}>Copy</button>
        </div>
    </div>
    </>
  )
}
