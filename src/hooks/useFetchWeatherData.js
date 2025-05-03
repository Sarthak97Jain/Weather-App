import { useEffect, useState } from "react";
import axios from 'axios';
const baseUrl = 'https://api.weatherapi.com/v1/';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const useFetchWeatherData = (city) => {
    const [response ,setResponse] = useState(null);
    const [error , setError] = useState(null);
    const url = `${baseUrl}current.json?q=${city}&key=${apiKey}`;
    useEffect(()=>{
        if (!city) return;
        const fetchData = async() => {
            setError(null);
            try{
                const response = await axios.get(url);
                setResponse(response);
            }
            catch (error){
                setError( error?.response?.data?.error?.message);
                console.error("Fetch error:", error?.response?.data?.error?.message)
            }
        }
        fetchData();
    },[city])
    return {response , error};
}
