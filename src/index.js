//Change City
function search(city) {
  let apiKey = "095d1f71575294110288899220c560b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchBar");
  search(cityInputElement.value);
}
search("Lisbon");
let form = document.querySelector("#weather-search-bar");
form.addEventListener("submit", handleSubmit);

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

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatDate(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatDate(response.data.sys.sunset * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
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
let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", showFahrTemperature);

function showFahrTemperature(event) {
  event.preventDefault();
  let fahrTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(fahrTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
