import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import H4 from './H4'

 function About() {
const location = useLocation();
console.log(location, 'location')

useEffect(() => {

}, [location] )



  return (
    <div>
      <H4>Its About Page</H4>
    </div>
  )
}


export default About