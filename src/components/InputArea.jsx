import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import { useFetchWeatherData } from "../hooks/useFetchWeatherData";
import { useSuggestionCityList } from "../hooks/useSuggestionCityList";
import { ClipLoader } from "react-spinners";
import "./InputArea.scss";

const InputArea = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState(null);
  const [submittedSuggestionCity, setSubmittedSuggestionCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState(null);
  const { response, error, loading } = useFetchWeatherData(submittedCity);
  const { citySuggestionList } = useSuggestionCityList(submittedSuggestionCity);

  const handleDropdownClick = (e) => {
    const tempCity = e.target.getAttribute("data-value");
    setCity(tempCity);
    setCitySuggestion("");
  };
  useEffect(() => {
    if (response) {
      setWeatherData(response);
    }
  }, [response]);
  useEffect(() => {
    if (citySuggestionList) {
      setCitySuggestion(citySuggestionList);
    }
  }, [citySuggestionList]);

  const handleSubmit = () => {
    setSubmittedCity(city);
    setCity("");
    setSubmittedSuggestionCity("");
    setCitySuggestion("");
  };
  return (
    <div className="weatherComponent">
      <div className="cityInputSection">
        <input
          type="text"
          value={city}
          placeholder="Type city here"
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.length > 2) {
              setSubmittedSuggestionCity(e.target.value);
            }
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Get Weather
        </button>
        <div className="cityListDropdown">
          {citySuggestion && (
            <ul
              onClick={(e) => {
                handleDropdownClick(e);
              }}
              className="cityListDropdownUL"
            >
              {citySuggestion.map((city) => {
                return (
                  <li className="cityListDropdownItem" data-value={city?.city}>
                    {city?.city}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="weartherCard">
        {loading ? (
          <div className="loader">
            <ClipLoader color="white" size={35} aria-label="Loading Spinner" />
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
};

/////todo
//weather background

export default InputArea;