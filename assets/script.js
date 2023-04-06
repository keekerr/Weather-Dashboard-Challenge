const apiKey = 'bc2c7446475bbf90e498692acec86859';

// DOM elements
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[type="text"]');
const cityViewedEl = document.getElementById('cityViewed');
const currentCityEl = document.querySelector('.current-city');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windyEl = document.getElementById('windy');
const uvEl = document.getElementById('uv');
const forecastEl = document.getElementById('forecast');

// Event listeners
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const cityName = searchInput.value.trim();
  if (cityName) {
    fetchWeatherData(cityName);
    searchInput.value = '';
  }
});

// Fetch weather data from OpenWeather API
async function fetchWeatherData(cityName) {
  try {
    // Current weather data
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    const currentResponse = await fetch(currentUrl);
    if (currentResponse.ok) {
      const currentData = await currentResponse.json();
      updateCurrentWeather(currentData);
      // Save the city name to local storage
      saveCityToLocalStorage(cityName);
      updateViewedCities();
    } else {
      throw new Error('Unable to fetch weather data');
    }

    // Five-day forecast data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;
    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      updateForecastWeather(forecastData);
    } else {
      throw new Error('Unable to fetch weather data');
    }
  } catch (error) {
    console.error(error);
  }
}

// Update current weather data
function updateCurrentWeather(data) {
  currentCityEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `Temperature: ${data.main.temp}°C`;
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
  windyEl.textContent = `Wind speed: ${data.wind.speed} m/s`;
  uvEl.textContent = ''; // To be implemented
}

// Update five-day forecast data
function updateForecastWeather(data) {
  const forecastList = data.list.slice(0, 5); // Only show next 5 days
  forecastEl.innerHTML = '';
  forecastList.forEach(item => {
    const date = new Date(item.dt_txt);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = `${item.main.temp.toFixed(0)}°C`;
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    const description = item.weather[0].description;
    const html = `
      <div class="col">
        <h5>${dayOfWeek}</h5>
        <img src="${icon}" alt="${description}" />
        <p>${temp}</p>
      </div>
    `;
    forecastEl.insertAdjacentHTML('beforeend', html);
  });
}

// Save city name to local storage
function saveCityToLocalStorage(cityName) {
  let cities = localStorage.getItem('cities') || '[]';
  cities = JSON.parse(cities);
  if (!cities.includes(cityName)) {
    cities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(cities));
  }
}