import React from 'react'

const WeatherCard = ({weatherData}) => {
  return (
    <div>
      <h4>{weatherData?.data?.location?.name}, {weatherData?.data?.location?.country}</h4>
      <div>Weather : {weatherData?.data?.current?.condition?.text}</div>
      <div>Temperature : {weatherData?.data?.current?.heatindex_c} C</div>
    </div>
  )
}

export default WeatherCard