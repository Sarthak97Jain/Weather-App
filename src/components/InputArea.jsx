import React, { useState , useEffect} from 'react';
import WeatherCard from './WeatherCard';
import { useFetchWeatherData } from '../hooks/useFetchWeatherData';
import { ClipLoader } from 'react-spinners';
import './InputArea.css';

const InputArea = () => {
 const [weatherData , setWeatherData] = useState(null);
 const [city , setCity] = useState('');
 const [submittedCity , setSubmittedCity] = useState(null);
 const {response , error, loading} = useFetchWeatherData(submittedCity);

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
    <div className='weatherComponent'>
      <input
        type="text"
        value={city}
        placeholder="Type city here"
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Get Weather
      </button>
      <div className='weartherCard'>
        {loading ? (
          <div className='loader'>
          <ClipLoader
            color='white'
            size={35}
            aria-label="Loading Spinner"
          />
          </div>
        ) : (
          <div>
            {!error && weatherData && <WeatherCard weatherData={weatherData} />}
            <p>{error && error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/////todo
//loader
//weather background
//add search city

export default InputArea;