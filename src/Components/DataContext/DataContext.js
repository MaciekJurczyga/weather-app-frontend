// DataContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';


const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState({
        date: null,
        maxTemperature: null,
        minTemperature: null,
        weatherCode: null,
        panelPower: null
    });
    const fetchData = async (latitude, longitude) => {
        try {
            const response = await axios.get('https://weather-app-backend-ly3s.onrender.com/api/weather', {
                params: {
                    latitude,
                    longitude
                }
            });
            const responseData = response.data;
            setWeatherData({
                date: responseData.date,
                maxTemperature: responseData.maxTemperature,
                minTemperature: responseData.minTemperature,
                weatherCode: responseData.weatherCode,
                panelPower: responseData.panelPower
            })
            return true;
        } catch (error) {
            console.error('Error while fetching data:', error);
            alert("Error while fetching the data");
            return false;
        }
    };

    return (
        <DataContext.Provider value={{ weatherData, fetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
