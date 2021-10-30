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
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp) + "°c";
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#weatherIcon").innerHTML = response.data.weather[0].icon;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let city = document.querySelector("#searchField").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let updateCity = document.querySelector("form");
updateCity.addEventListener("submit", searchCity);

