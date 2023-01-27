import React, { useState } from 'react'


const WeatherCard = ({weather, temperature, toggle, }) => {

    const [isCelcius, setisCelcius] = useState(true)

    const changeMetric = () => setisCelcius(!isCelcius)

   
    
  

   
  

  return (
    
   <article className={`card ${toggle ?'light' : 'dark' }`} >
    
    <h1>Current weather</h1>
    
    <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
    <div className='container' >
    <section>
        <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
       <h3>Temperature: { isCelcius ? `${temperature?.celcius} °C` : `${temperature?.farenheit} °F`  } </h3>
    </section>
    <section>
    <h2>{weather?.weather[0].description}</h2>
    <ul>
        <li> <span>Wind Speed </span>{weather?.wind.speed}m/s</li>
        <li> <span>Clouds </span> {weather?.clouds.all} % </li>
        <li> <span> Pressure </span>{weather?.main.pressure} hPa </li>
    </ul>
    </section>
    </div>
    <div className="cont-btn">
    <button onClick={changeMetric}    className={`${toggle ?'light' : 'dark' }`} > { isCelcius ? `change to °F` : `change to °C`}</button>
    </div>
    
   </article>
   
  )
    
}

export default WeatherCard 