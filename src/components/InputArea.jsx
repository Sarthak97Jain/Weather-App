import React, { useState , useEffect} from 'react';
import WeatherCard from './WeatherCard';
import { useFetchWeatherData } from '../hooks/useFetchWeatherData';

const InputArea = () => {
 const [weatherData , setWeatherData] = useState(null);
 const [city , setCity] = useState('');
 const [submittedCity , setSubmittedCity] = useState(null);
 const {response , error} = useFetchWeatherData(submittedCity);

 useEffect(() => {
    if (response) {
      setWeatherData(response);
    }
  }, [response]);

    const handleSubmit = () =>{
      setSubmittedCity(city);
      setCity('');
    }
  return (
    <>
        <input type="text" value={city} placeholder='Type city here' onChange={(e) => setCity(e.target.value)}/>
        <button type="submit" onClick={handleSubmit}>Get Weather</button>
        {(!error && weatherData) && <WeatherCard weatherData = {weatherData}/>}
        <p>{error && error}</p>
    </>
  )
}

export default InputArea;