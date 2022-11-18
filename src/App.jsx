import axios from 'axios'
import { useEffect, useState } from 'react'

import './App.css'
import Forecast from './components/Forecast'
import InputSearch from './components/InputSearch'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'


function App() {

  
  const [coords, setcoordinates] = useState()
  const [weather, setweather] = useState()
  const [temperature, settemperature] = useState()
  
  const [ip, setip] = useState()
  const [locationKey, setlocationKey] = useState()
  const [forecast, setforecast] = useState()



  useEffect(() => {
    // funcion que se ejecuta cuando llega la info de ubicacion
    const success = pos => {
      const obj = {

        lon: pos.coords.longitude,
        lat: pos.coords.latitude,
      }
      setcoordinates(obj);
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])



  // llama a la api del navegador para usar ubicacion actual

  useEffect(() => {
    if (coords) {
      const APIKEY = `d658790391445ab573acd8a88b3551d5`
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celcius = (res.data.main.temp - 273.15).toFixed(0)
          const farenheit = (celcius * 9 / 5 + 32).toFixed(0)
          settemperature({ celcius, farenheit })
          setweather(res.data)
        
        })
        .catch(err => console.log(err))

    }
    

  }, [coords])

  
  useEffect(() => {
    
      
      const URL = `https://api.ipify.org/?format=json`
      axios.get(URL)
        .then(res => {
          
          setip(res.data)
        })
        .catch(err => console.log(err))

    
    

  }, [])
  useEffect(() => {
    if(ip){
   const URL =`https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=%09Rleu0AJhCX9pRSfgALVsOAkSuykYUZDd&q=${ip}`
   axios.get(URL)
   .then(res => {
    setlocationKey(res.data.Key)
   })
   .catch(err => console.log(err))

    }
    
  }, [ip])
 
  
  
  useEffect(() => {
    if(locationKey){
      const URL =`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=%09Rleu0AJhCX9pRSfgALVsOAkSuykYUZDd`
      axios.get(URL)
      .then(res =>{
      setforecast(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [locationKey])
  
  
    const objBg ={
      backgroundImage : `url('https://source.unsplash.com/1600x900/?${weather?.weather[0].main})`
      
      
     }
  
  
   
   
   
   // change to dark mode

   
   const [toggle, settoggle] = useState(true)
   const handleClick = ()=>{
    settoggle((s)=> !s)
    
   }
 
  

  return (
    
    <div className="App"   >
     
    
      
     { weather ?
        <>
        <div className='container-change-mode-btn'>
        <button className='change-mode-btn' onClick={handleClick}>dark mode</button>
        </div>
       
          
      <WeatherCard weather={weather} temperature={temperature}  toggle={toggle} />
      
      <div className='forecast-container'> 
      {
        forecast?.DailyForecasts.map(dailyforecast =>(
          
          <Forecast dailyforecast={dailyforecast}
          
          weather={weather}
          toggle ={toggle}
          key={dailyforecast.Date}
          
          />
         
        ))
}
        </div>
        
    </>
     :
     <Loading />
    }
      </div>
  )
}


export default App
