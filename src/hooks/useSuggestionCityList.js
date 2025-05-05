import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useSuggestionCityList = (city) => {
    const [citySuggestionList , setCitySuggestionList] = useState('');
    useEffect(()=>{
        if(!city && city?.length <3 ){
            return
        }
        const fetchCities = async() => {
            try{
              const cityList = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?', {
                params: {
                  namePrefix: city,
                  limit: 10,
                },
                headers: {
                  'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com' ,
                  'x-rapidapi-key': '77c83bdf33msh94ec43ef9aa5d76p155db2jsne335f2d0cd32'
                }
              })
              setCitySuggestionList(cityList?.data?.data);
              console.log(cityList?.data?.data);
            }
            catch(error){
             console.log(error);
            }
          }
        fetchCities();
    },[city])
    return {citySuggestionList};
}