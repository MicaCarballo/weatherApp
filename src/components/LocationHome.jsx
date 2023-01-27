import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'



const LocationHome = ({coords, getLocation,onSearchChange}) => {
 
 
  const [search, setsearch] = useState(null)

 const handleOnChange = (searchData) =>{
  setsearch(searchData)
  onSearchChange(searchData)
 }
 

 
const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '45c152139fmsh891a7d78144cedap14a6a5jsn5b72dc54aff7',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }}

 



  const loadOptions = (inputValue) => {
    return fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  
  return (
    <div className='home'>
<div className='location'>
        <h2>Please enter valid city </h2>
        <AsyncPaginate
        className='searcher'
        placeholder= "seach for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        >

        </AsyncPaginate>
        <span>or</span>
        <button onClick={getLocation}>get device location</button>
    </div>
    </div>
    
  )
  }

export default LocationHome