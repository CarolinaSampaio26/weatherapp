import "./styles.css";

//Search City and get Weather
function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#searchBar");
  let currentCity = document.querySelector("#nowCity");
  let apiKey = "095d1f71575294110288899220c560b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    searchCity.value
  }&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);

  if (searchCity.value) {
    currentCity.innerHTML = `${searchCity.value}, `;
  } else if (searchCity.value.length === 0) {
    alert("Please enter a city");
  }
}

let form = document.querySelector("#weather-search-bar");
form.addEventListener("submit", searchCity);

function getWeather(response) {
  document.querySelector("#searchBar").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#rain").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#high").innerHTML = response.data.main.temp_max;
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp.min
  );
}

//Current location button
function searchPosition(position) {
  let apiKey = "095d1f71575294110288899220c560b0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getWeather);
}
function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let button = document.querySelector("#my-location");
button.addEventListener("click", searchCurrentLocation);

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
  currentDate.innerHTML = `${day} ${date} ${month}, ${year} ${hours}:${minutes}`;
}

formatDate();

//ºF and ºC
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
