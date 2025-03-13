const apiKey = "6fc301b22e42c9349b84f6a63d49cd45";

const weatherIcon = document.querySelector('.weather-icon');
async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the city name.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key.');
            } else {
                throw new Error('An error occurred while fetching weather data.');
            }
        }

        const data = await response.json();

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity-value').textContent = `${Math.round(data.main.humidity)}%`;
        document.getElementById('wind-value').textContent = `${Math.round(data.wind.speed)} km/h`;

        if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
        }
        else if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "clear.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }
        else if(data.weather[0].main == "Smoke"){
            weatherIcon.src = "smoke.png";
        }
        else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "thunderstorm.png";
        }
        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "mist.png";
        }

    } catch (error) {
        alert(error.message);
    }
}
