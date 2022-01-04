import React, { useEffect, useState } from 'react'
import axios from "axios";


function Weather() {
    const [wetherData, setWetherData] = useState({});
    const [units, setUnits] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '319075fcea465e88b5f2507b0536e447';

    useEffect(() => {
        setIsLoading(true);
        const success = async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await axios
                .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                .then((res) => {
                    setWetherData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsError(true);                    
                    setIsLoading(false);
                });

        };
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    let icon = wetherData.weather?.[0].icon;  
    let kelvin = wetherData.main?.temp;
    let centigrados = kelvin - 273.15;
    centigrados = centigrados.toFixed(2);
    



    return (
        <>
        {isLoading ? (
            <div className="loader">...Loading</div>
        ) : isError ? (  
            'No se pudo obtener'  
        ) : (
            <div className="Weather">
                <div className="WeatherHeader">


                    <h3>Weather App</h3>
                     <p>City: {wetherData.name} {wetherData.sys?.country}....`acattered clouds`</p>                        

                    <div className="WeatherContainer">                            
                    <div className="WeatherContainerImg">
                        <img
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt="icon"
                            
                        />
                        <p>
                            {units ? `${centigrados}°C` : `${centigrados * 1.8 + 32}°F`}{" "}
                        </p>
                    </div>

                    <div className="WeatherContainerInfo">                                                     
                        <p><i class="fas fa-wind"></i> <get className="get">wind speed: </get>{wetherData.wind?.speed} m/s</p>
                        <p><i class="fas fa-cloud-meatball"></i> <get className="get">clouds:  </get> {wetherData.clouds?.all} %</p>
                        <p><i class="fas fa-cloud-rain"></i> <get className="get">Pressure: </get>  Pressure: {wetherData.clouds?.all} mb </p>
                    </div>

                    </div>                        

                    <div className="WeatherFooter">
                        <button onClick={() => setUnits(!units)}>Change units</button>
                    </div>



                </div>
            </div>
        )}
    </>
    );

};


export default Weather
