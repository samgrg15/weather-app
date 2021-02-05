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

//<------add code to display the current geolocation of where you are now--->

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  //let apiKey = "3e0a34619942fda75b63ed8d41cdcd36";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  //console.log(apiUrl);
  let location = response.data.sys[0].name;
  document.querySelector("h2").innerHTML = location;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(handlePosition);

//<------add code to display days of the week here---->

//document.querySelector("#day-2").innerHTML = `<p>Test</p>`;

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
    let conditions = response.data.weather[0].description;
    document.querySelector(".weather").innerHTML = conditions;
  });
}

let sam = document.querySelector("#city-submit-button");
sam.addEventListener("click", searchCity);

//<------add code to display what the random button should do---->

/*element.addEventListener("click", ".random");
function randomCity() {
  let city = ["Rome"||"Paris"||"Geneva"||"Kathmandu"||"Budapest"||"Chester"||"Lisburn"||"Huddersfield"||"Edinburgh"||"York"||"Anaheim"];
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e0a34619942fda75b63ed8d41cdcd36&units=metric`
  
}


//let answers = ["Rome","Paris","Geneva","Kathmandu","Budapest","Chester","Lisburn","Huddersfield","Edinburgh","York","Anaheim"];
//const randomCity = Math.Floor(Math.random() * 10);
//if (randomCity === 0) {
//  answers = Rome
//}

http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e0a34619942fda75b63ed8d41cdcd36&units=metric

//function dice(event) {
 // event.preventDefault();

  
//let randomisation = document.querySelector("#random-submit-button");
//element.addEventListener("click", dice);
*/
 

