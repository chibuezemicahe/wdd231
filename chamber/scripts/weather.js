// Abia State, Nigeria coordinates
const LATITUDE = 5.532003;
const LONGITUDE = 7.486003;
const API_KEY ='aa1b85a8cb26db800594e2bcd1eb9c9a'; // Replace with your actual API key

async function getWeatherData() {
    try {
        // Get current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();

        // Get forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayWeatherError();
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.getElementById('current-temp');
    const weatherDescription = document.getElementById('weather-description');
    const weatherIcon = document.querySelector('.weather-icon');

    // Display current temperature
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;

    // Display weather description
    weatherDescription.textContent = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Display weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" 
             alt="${data.weather[0].description}">
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    // Get one forecast per day (excluding today) at noon
    const dailyForecasts = data.list
        .filter(item => {
            const time = new Date(item.dt * 1000);
            return time.getHours() === 12;
        })
        .slice(0, 3);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" 
                 alt="${forecast.weather[0].description}">
            <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

function displayWeatherError() {
    const weatherContainer = document.querySelector('.weather-container');
    weatherContainer.innerHTML = `
        <div class="weather-error">
            <p>Weather information is temporarily unavailable.</p>
        </div>
    `;
}

// Load weather data when the page loads
document.addEventListener('DOMContentLoaded', getWeatherData);