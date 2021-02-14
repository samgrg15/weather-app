let axios = require("axios");
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = week[now.getDay()];
let dayTime = `${date} ${hours}:${minutes}`;

// DISPLAY CURRENT DAY AND TIME:
document.querySelector("#current-day-time").innerHTML = `<p>${dayTime}</p>`;

//SEARCH CITY AND REPLACE TITLE; SEARCH FROM WEATHER API
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput);
  let h2 = document.querySelector("h2");
  h2.innerHTML = searchInput.value;
}

//CODE TO DISPLAY TEMPERATURE AND CONDITIONS FOR SEARCH ITEM
let element = document.querySelector("#city-submit-button");
element.addEventListener("click", showCity);
function searchCity() {
  let searchCity = document.querySelector("#search-text-input");
  let apiKey = "3e0a34619942fda75b63ed8d41cdcd36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(searchCity);
  axios.get(apiUrl).then(function(response){
    let temperature = Math.round(response.data.main.temp);
    console.log(response.data.main.temp);
    document.querySelector("h3").innerHTML = `${temperature}°C`;
    let feelsLike = Math.round(response.data.main.feels_like);
    document.querySelector(".feels").innerHTML = `<p>Feels like ${feelsLike}°C</p>`;
    let conditions = `${(response.data.weather[0].description.toUpperCase())}`;
    document.querySelector(".weather").innerHTML = conditions;
  });
}

let sam = document.querySelector("#city-submit-button");
sam.addEventListener("click", searchCity);

//<------MAKE THE RANDOM BUTTON WORK HERE---->

//<------CODE TO CHANGE IMAGE DEPENDING ON WEATHER HERE---->

// CODE TO SHOW THE TEMPERATURE OF EACH HOUR 

function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}


//<------CODE TO DISPLAY WEATHER AT DIFFERENT TIMES HERE ---->

function futureTime(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  console.log(response.data.main.temp);

  document.querySelector("h3").innerHTML = `${temperature}°C`;
  document.querySelector("h2").innerHTML = currentCity;

  let unix_timestamp = response.data.hourly[1].dt;
  console.log(unix_timestamp);
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
let newDate = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
let newHours = newDate.getHours();
// Minutes part from the timestamp
let newMinutes = "0" + newDate.getMinutes();
// Will display time in 10:30:23 format
let formattedTime = newHours + ':' + newMinutes.substr(-2);
console.log(formattedTime);

}

function handleFuture(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "3e0a34619942fda75b63ed8d41cdcd36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${apiKey}&units=metric`
  console.log(long);
  console.log(lat);

  axios.get(apiUrl).then(futureTime);
}


//<------DISPLAY CURRENT CITY AND TEMPERATURE BASED ON LOCATION--->

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  console.log(response.data.main.temp);
  document.querySelector("h3").innerHTML = `${temperature}°C`;
  document.querySelector("h2").innerHTML = currentCity;
}

let currentButton = document.querySelector("#random-submit-button");
currentButton.addEventListener("click", handlePosition);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "3e0a34619942fda75b63ed8d41cdcd36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  console.log(long);
  console.log(lat);

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(handlePosition);

//SHECODES------->

/*function displayForecast(response) {
  let forecastElement = document.querySelector(("#days col-md-3");
  let forecast = response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = `
  <div class="days col-md-3">
          <p class="hour">12:00</p>
          <img src="images/sun.png" img id="sun" />
          <p class="temp">${Math.round(response.data.main.temp)}</p>
        </div>
        `;
}*/
