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
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "°C";
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#weatherIcon").setAttribute(   
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#weatherIcon").setAttribute("alt", response.data.weather[0].description);
 
getForecast(response.data.coord);
changeBackground(response.data.main.temp);
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

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Amsterdam");

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index < 4)
forecastHTML = 
    forecastHTML + 
    `
                  <div class="col-3">
                        <div class="weather-forecast-date">
                           ${formatDay(forecastDay.dt)}
                        </div>
                              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="40px">
                           <div class="weather-forecast-temp">${Math.round(forecastDay.temp.max)}° 
                                 <span class="weather-forcast-min">${Math.round(forecastDay.temp.min)}°</span>
                           </div>
                        </div>
  `;
  })
  
forecastHTML = forecastHTML + `</div>`; 
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coord){
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
console.log(getForecast);


function changeBackground(temperature) {
  if (temperature > 50) {
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(178, 39, 41) 50%,  rgb(178, 39, 41) 50%, rgb(178, 39, 41) 66%)";
  } else {
  if (temperature > 40 && temperature < 50){
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(226, 87, 35) 50%,  rgb(226, 87, 35) 50%, rgb(226, 87, 35) 66%)";
  } else {
  if (temperature > 30 && temperature < 40){
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(232, 134, 31) 50%,  rgb(232, 134, 31) 50%, rgb(232, 134, 31) 66%)";
  } else {
  if (temperature > 20 && temperature < 30){
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(242, 184, 0) 50%,  rgb(242, 184, 0) 50%, rgb(242, 184, 0) 66%)";
  } else {
  if (temperature > 10 && temperature < 20){
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(97, 187, 194) 50%,  rgb(97, 187, 194) 50%, rgb(97, 187, 194) 66%)";
  } else {
  if (temperature > 0 && temperature < 10){
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(1, 109, 177) 50%,  rgb(1, 109, 177) 50%, rgb(1, 109, 177) 66%)";
    } else {
  if (temperature < 0){
    document.querySelector("#cardStyle").style.background =
      "radial-gradient(circle at 50% 5%,  rgb(44, 48, 136) 50%,  rgb(44, 48, 136) 50%, rgb(44, 48, 136) 66%)";
    }
  }
  }
    }
  }
    }
  }
  }
