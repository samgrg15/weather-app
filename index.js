let axios = require("axios");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Friday", "Sat"];
let date = week[now.getDay()];

let dayTime = `${date} ${hours}:${minutes}`;
document.querySelector("#current-day-time").innerHTML = `<p>${dayTime}</p>`;

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput);

  let h2 = document.querySelector("h2");
  h2.innerHTML = searchInput.value;
}

let element = document.querySelector("#city-submit-button");
element.addEventListener("click", showCity);

function searchCity(location) {
  let apiKey = "3e0a34619942fda75b63ed8d41cdcd36";
  let city = document.querySelector("#search-text-input");
  console.log(city);
  let apiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(searchCity);
}
