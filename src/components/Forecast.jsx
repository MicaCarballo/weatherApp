import React from 'react'

const Forecast = ({dailyforecast, toggle,isCelcius }) => {

  

 
  const d = new Date(dailyforecast.Date);
let day = d.getDay();
const daysOftheWeek =[
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurdsday",
  "Friday",
  "Saturday",
  "Sunday"
]
function getIconNumber() {
  let iconNumber="";
  if(dailyforecast.Day.Icon < 10){
    return  iconNumber = "0"+dailyforecast.Day.Icon
  }else{
    return iconNumber = dailyforecast.Day.Icon
  }
}


 
  return (


  <article className={`forecast-card ${toggle ?'light' : 'dark' }`} >
      <h3 className='weekday-name'>{daysOftheWeek[day]}</h3>
      
        <img src={`https://developer.accuweather.com/sites/default/files/${getIconNumber()}-s.png`} />
      
        <ul className='forecast-temperatures'>
          <li className='forecast-temp-max'>{ isCelcius ? `${Math.trunc((dailyforecast.Temperature.Maximum.Value - 32)* 5/9)}°C ` : `${dailyforecast.Temperature.Maximum.Value}°F`}</li>
          <li className='forecast-temp-min'> {isCelcius ? `${Math.trunc((dailyforecast.Temperature.Minimum.Value - 32)* 5/9)}°C ` : `${dailyforecast.Temperature.Minimum.Value}°F`}</li>
        </ul>
        
    </article>
  )
}

export default Forecast