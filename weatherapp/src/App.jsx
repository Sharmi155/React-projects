import { useEffect, useState } from 'react'
import './App.css'
/* importing the images*/
import clearicon from './assets/clear.png'
import cloudicon from './assets/cloud.png'
import drizzleicon from './assets/drizzle.png'
import humidityicon from './assets/humidity.png'
import rainicon from './assets/rain.jpg'
import windicon from './assets/wind.png'
import snowicon from './assets/snow.png'
import searchicon from './assets/search.png'
import propTypes from "prop-types"
const Weatherdetails=({icon,temp,city,country,lat,
      log, humidity,wind})=>{
  return(<>
  <div className='image'>
    <img  src={icon} alt="img"/>
  </div>
  <div className='temp'>{temp}°C</div>  
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
  <div>
    <span className='lat'>Latitude</span>
    <span>{lat}</span>
  </div>
  <div>
    <span className='lat'>Longitude</span>
    <span>{log}</span>
  </div>
  </div>
  <div className='datacontainer'>
    <div className='element'>
      <img className='icon' src={humidityicon} alt="humidity"/>
      <div className='data'>
        <div className='humiditypercent'>{humidity} %</div>
        <div className='text'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img className='icon' src={windicon} alt="wind"/>
      <div className='data'>
        <div className='windpercent'>{wind} km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
  </div>
   </>)
}
Weatherdetails.propTypes={
  icon:propTypes.string.isRequired,
  temp:propTypes.number.isRequired,
  city:propTypes.string.isRequired,
  country:propTypes.string.isRequired,
  humidity:propTypes.number.isRequired,
  wind:propTypes.number.isRequired,
  lat:propTypes.number.isRequired,
  log:propTypes.number.isRequired,

};
function App() {
  let apikey=""
  const[text,setText]=useState('chennai');
  const[icon,setIcon]=useState('');
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState('');
  const[country,setCountry]=useState('');
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,SetWind]=useState(0)
  const[citynotfound,setCitynotfound]=useState(false);
  const [loading,setloading]=useState(false);
  const[error,setError]=useState(false);
  const weathericons={
    "01d":clearicon,
    "01n":clearicon,
    "02d":cloudicon,
    "02n":cloudicon,
    "03d":drizzleicon,
    "03n":drizzleicon,
    "04d":drizzleicon,
    "04n":drizzleicon,
    "09d":rainicon,
    "09n":rainicon,
    "10d":rainicon,
    "10n":rainicon,
    "13d":snowicon,
    "13n":snowicon,
  }
  const search=async ()=>
    {
      setloading(true);
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`;
      try{
        let res=await fetch(url);
        let data=await res.json();
        if(data.cod ==='404'){
          console.log("city not found")
          setCitynotfound(true);
          setloading(false);
          return;
        }
        setHumidity(data.main.humidity);
        SetWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        setIcon(weathericons[data.weather[0].icon]|| clearicon)
        setCitynotfound(false);
      }catch(error){
      console.log("An error occurred:",error.message)
      setError("AN ERROR OCCURRED ")
      }
      finally{
        setloading(false);

      }
    }

    const handlecity=(e)=>
    {
     setText(e.target.value)
    }

    const handlekeydown=(e)=>
    {
     if(e.key ==="Enter"){
      search();
     }

    }
 useEffect(function(){
  search();
 },[])
  return (
    <>
    <div className='container'>
      <div className='input-container'>
      <input type="text" className='cityinput' placeholder='Search City' onChange={handlecity} value={text} onKeyUpCapture={handlekeydown}/>
      <div className='searchicon' onClick={search}>
        <img src={searchicon}/>
      </div>
      </div>
      { loading &&<div className='loadmessage'>Loading.....</div>}
      {error &&<div className='errmessage'>{error}</div>}
      {citynotfound && <div className='cnf'>City not Found</div>}
      {!loading && !citynotfound && <Weatherdetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
     <p className='copyright'>
      &copy; Designed by <span>Sharmi</span> 2024 
    </p>
    </div>

    </>


  )
}

export default App 
