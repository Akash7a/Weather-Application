let cityInput = document.querySelector("#cityInput");
const form = document.querySelector("form");
const weatherInfoContainer = document.querySelector("#weatherInfo");

const fetchWeather = async () => {
    let city = cityInput.value.trim();

    if (!city) {
        city = "Jaunpur";
    }

    const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?contentType=json&unitGroup=metric&aggregateHours=24&location=${city}&shortColumnNames=false`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '665c74a34bmshefffdf82815c84bp1b122bjsn13d29e14e953',
            'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result); // Log the complete response for debugging
        showWeatherInfo(result);
    } catch (error) {
        console.error(error);
    }
};

const showWeatherInfo = (data) => {
    const locationKey = Object.keys(data.locations)[0];
    const locationData = data.locations[locationKey];
    const currentConditions = locationData.values[0];

    if (!currentConditions) {
        console.error('Incomplete weather data received', data);
        weatherInfoContainer.innerHTML = `<p>Weather information is not available for the specified city.</p>`;
        return;
    }

    const temperatureCelsius = currentConditions.temp;
    const humidity = currentConditions.humidity;
    const windSpeed = currentConditions.wspd;
    const weatherDescription = currentConditions.conditions;
    let iconUrl = `https://openweathermap.org/img/wn/01d.png`; // Placeholder icon
 
    weatherInfoContainer.innerHTML = `
        <h2>Weather in ${locationData.address}</h2>
        <p>Temperature: ${temperatureCelsius} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Weather: ${weatherDescription}</p>
        <img id="icon" height="50px" src="${iconUrl}" alt="Weather Icon" />
    `;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWeather();
    cityInput.value = "";
});

document.addEventListener("DOMContentLoaded", fetchWeather);