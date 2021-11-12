let currentTime = new Date();
console.log(currentTime);

let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
let day = days[currentTime.getDay()];
console.log (day);

let hours = currentTime.getHours();
console.log(hours);

let minutes = currentTime.getUTCMinutes();
console.log(minutes);

function displayTime(){
let h4 = document.querySelector("h4");
h4.innerHTML = (`${day} ${hours}:${minutes}`);
}

displayTime();

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(`${weatherUrl}&appid=${apiKey}`).then(showWeather, handlePosition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);


function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "°c";
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#weatherIcon").setAttribute(   
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#weatherIcon").setAttribute("alt", response.data.weather[0].description);
  }

function searchCity(city) {
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#searchField").value;
  searchCity(city);
}

let updateCity = document.querySelector("form");
updateCity.addEventListener("submit", searchCity);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Amsterdam");

function changeBackground(color) {
  let changeTemperature = Math.round(response.data.main.temp);
  if (changeTemperature <=15) {
  document.getElementById("cardStyle").style.background = 'radial-gradient(circle at 50% 5%,  rgb(197, 255, 38) 50%,  rgb(255, 255, 255) 50%, rgb(255, 255, 255) 66%)';
  }
else {
  document.getElementById("cardStyle").style.background = 'radial-gradient(circle at 50% 5%,  rgb(300, 200, 38) 50%,  rgb(255, 255, 255) 50%, rgb(255, 255, 255) 66%)';
}
}
searchForm.addEventListener("submit", changeBackground);

                       
