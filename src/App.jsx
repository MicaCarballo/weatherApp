import axios from 'axios'
import { useEffect, useState } from 'react'

import './App.css'
import Forecast from './components/Forecast'

import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'
import LocationHome from './components/LocationHome'




function App() {


  const [coords, setcoordinates] = useState()
  const [weather, setweather] = useState()
  const [temperature, settemperature] = useState()


  const [locationKey, setlocationKey] = useState()
  const [forecast, setforecast] = useState()

  const [loading, setloading] = useState(false)
 


  const getLocation = () => {
    // funcion que se ejecuta cuando llega la info de ubicacion

    const success = pos => {
      const obj = {

        lon: pos.coords.longitude,
        lat: pos.coords.latitude,
      }
      setcoordinates(obj);
    }
    navigator.geolocation.getCurrentPosition(success)
  }



  // llama a la api del navegador para usar ubicacion actual

  useEffect(() => {
    if (coords) {
      const APIKEY = `a4d105d3a75a918c4c066c5ed7fa4a15`
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
    if (coords) {
      const URL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%09Rleu0AJhCX9pRSfgALVsOAkSuykYUZDd&q=${coords.lat},${coords.lon}`
      axios.get(URL)
        .then(res => {
          setlocationKey(res.data.Key)
        })
        .catch(err => console.log(err))

    }

  }, [coords])



  useEffect(() => {
    if (locationKey) {
      const URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=%09Rleu0AJhCX9pRSfgALVsOAkSuykYUZDd`
      axios.get(URL)
        .then(res => {
          setforecast(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [locationKey])

  useEffect(() => {

    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 2000);

  }, [])






  // change to dark mode


  const [toggle, settoggle] = useState(true)
  const handleClick = () => {
    settoggle((s) => !s)

  };
  const objBg = {
    backgroundImage: `url('https://source.unsplash.com/1600x900/?clouds')`


  }

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const obj = {
      lat: lat,
      lon: lon
    }
    setcoordinates(obj)
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    const URL = "https://eonet.gsfc.nasa.gov/api/v2.1/events"
    axios.get(URL)
      .then((res) => {
        if (res.data) {
          const data = (res.data);
         
         /* data?.events.map((event) => {
            /*if (event?.categories[0].id === 10) {
              
              setStormData(event)

              


            } if(event.categories[0].title === "Volcanoes"){
              console.log(data.event)
            }

            setStormData(event)
          }
          )*/
          setStormData(data.events)
        }
      })
      .catch(() => console.log("error"))
  }
    , [])


  

    const [isCelcius, setisCelcius] = useState(true)

    const changeMetric = () => setisCelcius(!isCelcius)





  return (

    <div className="App" style={objBg} >
      {
        loading ?
          <Loading />
          :

          weather ?
            <>
                <div className='weather-container'>
              <div className='container-change-mode-btn'>
                <button className='change-mode-btn' onClick={handleClick}>{toggle ? "dark mode" : "light mode"}</button>
              </div>
              <div className='cards-container'>
             

              <WeatherCard weather={weather} temperature={temperature} isCelcius={isCelcius} changeMetric={changeMetric} style={objBg} toggle={toggle} />

              <div className='forecast-container'>
                {
                  forecast?.DailyForecasts.map(dailyforecast => (

                    <Forecast dailyforecast={dailyforecast}
                    isCelcius={isCelcius} changeMetric={changeMetric}

                      weather={weather}
                      toggle={toggle}
                      key={dailyforecast.Date}


                    />

                  ))

                }
                
              </div>


               </div>
                </div>
            </>
            :
            <LocationHome coords
              ={coords}
              getLocation={getLocation}
              onSearchChange={handleOnSearchChange}

            />

      }








    </div>
  )
}


export default App
