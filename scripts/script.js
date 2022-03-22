class Userinfo{
  constructor(){
      this.timeOpened = new Date();
      this.timezone = (new Date()).getTimezoneOffset()/60;
  }
  async position(){
      const pos = await new Promise(function(resolve, reject){
          navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
          lon: pos.coords.longitude,
          lat: pos.coords.latitude
      };
  }
}

let info = new Userinfo();
async function getLocation(){
  let data = info.position().then(function(value){
    console.log(value);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin","*");
    xhr.send(JSON.stringify(value));
  });
}
getLocation();  
let oReq = new XMLHttpRequest({mozAnon: true, mozSystem: true});
oReq.open("GET", "http://127.0.0.1:7000/", true);
oReq.setRequestHeader("Content-Type", "application/json");
oReq.setRequestHeader("Access-Control-Allow-Origin","*");
oReq.responseType = "json";
oReq.onload = function(){
//my current time
  let time = document.getElementById("timeToday");
  let clock = document.createElement("p");
  time.prepend(clock);
  function getTime(){
      let currentDate = new Date();
      let hours = (currentDate.getHours() < 10) ? '0' + currentDate.getHours() : currentDate.getHours(),
      minutes = (currentDate.getMinutes() < 10) ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
      clock.innerHTML = hours + ':' + minutes;
    }
  setInterval(getTime, 1000);
  getTime();
//my current date
  let todayDateAndMonth = document.getElementById("todayDayAndMonth");
  let todayWeekDay = document.getElementById("todayWeekDay");
  let todayYear = document.getElementById("todayYear");
  time.prepend(clock);
  function getTodaysDate(){
      let currentDate = new Date();
      let weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
      let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля",
       "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
      let day = currentDate.getDate(),
      weekday = currentDate.getDay(),
      month = currentDate.getMonth(),
      year = currentDate.getFullYear();
      todayDateAndMonth.innerHTML = day + " " + months[month];
      todayWeekDay.innerHTML = weekdays[weekday];
      todayYear.innerHTML = year;
    }
  setInterval(getTodaysDate, 1000);
  getTodaysDate();
//my current weather
  let currentWeather = document.getElementById("currentWeather");
  let currentWeatherIcon = document.createElement("img");
  currentWeatherIcon.setAttribute("src", `./images/icons/цветные белые сплошные/${this.response.fact.icon}.svg`);
  let temperature = document.getElementById("currentTemperature");
  temperature.innerHTML = "+" + this.response.fact.temp + "°С";
//my current city
  let currentCity = document.getElementById("currentCity");
  currentCity.innerHTML = this.response.geo_object.locality.name;
//my current forecast for a week
  let forecast = document.getElementById("forecastWeek");
  for(let i = 0; i < 6; i++){
    let forecastBlock = document.createElement("div");
    forecastBlock.setAttribute("class", "forecast");
    let forecastWeatherBlock = document.createElement("div");
    forecastWeatherBlock.setAttribute("class", "forecast-weather");
    let forecastDayBlock = document.createElement("div");
    forecastDayBlock.setAttribute("class", "forecast-day");
    let currentDayForecastText = document.createElement("p");
    let currentForecastBlock = document.createElement("div");
    currentForecastBlock.setAttribute("class", "current-forecast");
    let currentForecastTemperature = document.createElement("div");
    currentForecastTemperature.setAttribute("class", "forecast-temperature");
    let currentForecastIcon = document.createElement("img");    
    currentForecastTemperature.innerHTML = "+" + this.response.forecasts[i].parts.day.temp_avg + "°С";
    currentForecastIcon.setAttribute("src", `./images/icons/цветные белые сплошные/${this.response.forecasts[i].parts.day.icon}.svg`);
    currentForecastBlock.appendChild(currentForecastTemperature);
    currentForecastBlock.prepend(currentForecastIcon);
    forecastDayBlock.appendChild(currentDayForecastText);
    forecastWeatherBlock.appendChild(forecastDayBlock);
    forecastWeatherBlock.appendChild(currentForecastBlock);
    forecastBlock.appendChild(forecastWeatherBlock);
    forecast.appendChild(forecastBlock);
    let currentDate = new Date();
    let weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let weekday = currentDate.getDay();
    
    if (weekday + i + 1 > 6) {
      currentDayForecastText.innerHTML = weekdays[i - weekday - 2];
    } else {
      currentDayForecastText.innerHTML = weekdays[weekday + i + 1];
    }
  }
  //test
  let weather = this.response;
  currentWeather.prepend(currentWeatherIcon);
  console.log(weather);
};
oReq.send();
