import "./mainView.css"
import "./startingView"
import weatherCodeUrl from '../weatherCodeUrls.json';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../DataContext/DataContext.js';


const MainView = () => {

    const {weatherData} = useDataContext();
    const maxTemperature = weatherData.maxTemperature;
    const minTemperature = weatherData.minTemperature;
    const weatherCode = weatherData.weatherCode;
    const panelPower = weatherData.panelPower;
    const date = weatherData.date;
    const navigation = useNavigate();
    const changeLocation = () => {
        navigation("/");
    }
    const roundToTwo = (number) => {
        return Math.round(number * 100)/100;
    }
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    const getWeatherImg = (weatherCode) =>{
        if(weatherCodeUrl[weatherCode] && weatherCodeUrl[weatherCode].day){
            return weatherCodeUrl[weatherCode].day.image;
        }
        else{
            return "https://cdn-icons-png.flaticon.com/128/8475/8475489.png"
        }
    }


    return(

        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-2 sidebar">
                    <div className="sidebar-item">
                        <img src="https://cdn-icons-png.flaticon.com/128/854/854929.png" alt="change the location" onClick={changeLocation} />
                    </div>

                </div>
                <div className="col-12 col-md-10 main-content">
                    <div className="weather-info">
                        <text>7-day forecast</text>

                        <div className="row forecast">
                            <div className="col forecast-item">
                                <p>{formatDate(date[0])}</p>
                                <img src={getWeatherImg(weatherCode[0])} alt="Weather Icon"  width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[0]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[0]}</span><span >°</span>
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>{formatDate(date[1])}</p>
                                <img src={getWeatherImg(weatherCode[1])} alt="Weather Icon"  width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[1]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[1]}</span><span >°</span>
                                </p>

                            </div>
                            <div className="col forecast-item">
                                <p>{formatDate(date[2])}</p>
                                <img src={getWeatherImg(weatherCode[2])} alt="Weather Icon" width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[2]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[2]}</span><span >°</span>
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>{formatDate(date[3])}</p>
                                <img src={getWeatherImg(weatherCode[3])} alt="Weather Icon"  width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[3]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[3]}</span><span >°</span>
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>{formatDate(date[4])}</p>
                                <img src={getWeatherImg(weatherCode[4])} alt="Weather Icon"  width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[4]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[4]}</span><span >°</span>
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>{formatDate(date[5])}</p>
                                <img src={getWeatherImg(weatherCode[5])} alt="Weather Icon"  width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[5]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[5]}</span><span >°</span>
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>{formatDate(date[6])}</p>
                                <img src={getWeatherImg(weatherCode[6])} alt="Weather Icon"  width="35%" height="35%"/>
                                <p>
                                    {maxTemperature[6]}<span>°</span> / <span style={{ fontWeight: 300}}>{minTemperature[6]}</span><span >°</span>
                                </p>
                            </div>
                        </div>

                        <text>Estimated power of the photovoltaic installation [kWh]</text>

                        <div className="row forecast">
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[0])}
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[1])}
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[2])}
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[3])}
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[4])}
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[5])}
                                </p>
                            </div>
                            <div className="col forecast-item">
                                <p>
                                    {roundToTwo(panelPower[6])}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainView