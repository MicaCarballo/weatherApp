
  

import GoogleMapReact from 'google-map-react';

  


 import React from 'react'


 
 const Map = ({coords}) => {
  let latitude= coords.lat
  let longitude = coords.lon
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 4
  };
   
  
 

       
   return (
    <div className='map'>
      
    <GoogleMapReact
 bootstrapURLKeys={{ key: "AIzaSyCC3iOkqaRCA-z9C-IL-U94XQJIY94K9r0" }}
 defaultCenter={defaultProps.center}
 defaultZoom={defaultProps.zoom}
        > 
     
      
        
      
         
        </GoogleMapReact>
    
  

         
    
 </div>


   
     
      
     
   )
 }
 
 export default Map