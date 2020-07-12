//Change City
function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#searchBar");
  let currentCity = document.querySelector("#nowCity");
  let apiKey = "095d1f71575294110288899220c560b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);

  if (searchCity.value) {
    currentCity.innerHTML = `${searchCity.value}, `;
  } else if (searchCity.value.length === 0) {
    alert("Please enter a city");
  }
}

let form = document.querySelector("#weather-search-bar");
form.addEventListener("submit", searchCity);

//Change Temperature
function getWeather(response) {
  let cityElement = document.querySelector("#nowCity");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let highElement = document.querySelector("#high");
  highElement.innerHTML = Math.round(response.data.main.temp_max);

  let lowElement = document.querySelector("#low");
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
}

//Date&Time
function formatDate() {
  let now = new Date();
  let year = now.getFullYear();
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${day} ${date} ${month}, ${year} ${hours}:${minutes}`;
}

formatDate();

//ºF and ºC
function convertCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "18ºC";
}
let tempC = document.querySelector("#celcius");
tempC.addEventListener("click", convertCelsius);

function convertFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "64ºF";
}
let tempF = document.querySelector("#fahr");
tempF.addEventListener("click", convertFahrenheit);
