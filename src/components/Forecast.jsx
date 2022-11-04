import React from 'react'

const Forecast = ({dailyforecast, toggle, }) => {

  

 
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
          <li className='forecast-temp-max'>{dailyforecast.Temperature.Maximum.Value}°</li>
          <li className='forecast-temp-min'>{dailyforecast.Temperature.Minimum.Value}°</li>
        </ul>
        
    </article>
  )
}

export default Forecast