import React from 'react'

const InputSearch = () => {
  return (
    <div>
        <input type="text" id='search' placeholder='enter city name'/>
        <label htmlFor="search"></label>
        <button>search</button>
        <p>Or</p>
        <button>Allow device location</button>
    </div>
  )
}

export default InputSearch