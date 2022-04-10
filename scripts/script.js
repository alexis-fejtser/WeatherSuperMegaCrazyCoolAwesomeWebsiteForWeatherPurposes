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
oReq.onload = function(oReq){
//source of my weather
  let source = document.getElementById("logoSource");
  let logo = document.createElement("img");
  logo.setAttribute("src", "./images/New logo Погода/New logo Погода 21-05_2021/New logo Погода белый.svg");
  let open = document.createElement("a");
  open.setAttribute("href", this.response.info.url);
  open.appendChild(logo);
  source.appendChild(open);
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
//my current date :()
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
  let new_weekday = 0;
  for(let i = 1; i <= 6; i++){
    let forecastButton = document.createElement("button");
    forecastButton.setAttribute("class", "forecast-button");
    forecastButton.setAttribute("id", `button_${i}`);
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
    forecastButton.appendChild(forecastBlock);
    forecast.appendChild(forecastButton);
    let currentDate = new Date();
    let weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let weekday = currentDate.getDay();
    console.log(weekday);
    if((weekday + i) >= 7 ){
      currentDayForecastText.innerHTML = weekdays[new_weekday];
      new_weekday++;
    } else {
      currentDayForecastText.innerHTML = weekdays[weekday + i];
    }
  }
//creating some blocks for my jquery animation
  for(let i = 1; i <= 6; i++){
    let logo = document.createElement("img");
    logo.setAttribute("src", "./images/New logo Погода/New logo Погода 21-05_2021/New logo Погода белый.svg");
    let open = document.createElement("a");
    open.setAttribute("href", this.response.info.url);
    let avgTemp = document.createElement("p");
    avgTemp.innerHTML = `${this.response.forecasts[i].parts.day.temp_avg}°С`;
    let avgWind = document.createElement("p");
    avgWind.innerHTML = `${this.response.forecasts[i].parts.day.wind_speed}`;
    switch(this.response.forecasts[i].parts.day.wind_dir){
      case "nw":
        avgWind.innerHTML = `${avgWind.textContent} м/с, СЗ`;
        break;
      case "n":
        avgWind.innerHTML = `${avgWind.textContent} м/с, C`;
        break;
      case "ne":
        avgWind.innerHTML = `${avgWind.textContent} м/с, CВ`;
        break;
      case "e":
        avgWind.innerHTML = `${avgWind.textContent} м/с, В`;
        break;
      case "se":
        avgWind.innerHTML = `${avgWind.textContent} м/с, ЮВ`;
        break;
      case "s":
        avgWind.innerHTML = `${avgWind.textContent} м/с, Ю`;
        break;
      case "sw":
        avgWind.innerHTML = `${avgWind.textContent} м/с, ЮЗ`;
        break;
      case "w":
        avgWind.innerHTML = `${avgWind.textContent} м/с, З`;
        break;
      case "c":
        avgWind.innerHTML = `${avgWind.textContent} м/с, Ш`;
        break;
    }
    let avgWater = document.createElement("p");
    avgWater.innerHTML = `${this.response.forecasts[i].parts.day.prec_mm} мм.`;
    let avgPressure = document.createElement("p");
    avgPressure.innerHTML = `${this.response.forecasts[i].parts.day.pressure_mm} мм. рт. ст.`;
    let avgHumigity = document.createElement("p");
    avgHumigity.innerHTML = `${this.response.forecasts[i].parts.day.humidity}%`;

    let avgTempMorning = document.createElement("span");
    avgTempMorning.innerHTML = `${this.response.forecasts[i].parts.morning.temp_avg}°С`;
    let forecastMorningIcon = document.createElement("img");
    forecastMorningIcon.setAttribute("src", `./images/icons/цветные белые сплошные/${this.response.forecasts[i].parts.morning.icon}.svg`);
    let avgTempDay = document.createElement("span");
    avgTempDay.innerHTML = `${this.response.forecasts[i].parts.day.temp_avg}°С`;
    let forecastDayIcon = document.createElement("img");
    forecastDayIcon.setAttribute("src", `./images/icons/цветные белые сплошные/${this.response.forecasts[i].parts.day.icon}.svg`);
    let avgTempEvening = document.createElement("span");
    avgTempEvening.innerHTML = `${this.response.forecasts[i].parts.evening.temp_avg}°С`;
    let forecastEveningIcon = document.createElement("img");
    forecastEveningIcon.setAttribute("src", `./images/icons/цветные белые сплошные/${this.response.forecasts[i].parts.evening.icon}.svg`);
    let avgTempNight = document.createElement("span");
    avgTempNight.innerHTML = `${this.response.forecasts[i].parts.night.temp_avg}°С`;
    let forecastNightIcon = document.createElement("img");
    forecastNightIcon.setAttribute("src", `./images/icons/цветные белые сплошные/${this.response.forecasts[i].parts.night.icon}.svg`)
    
//WELCOME TO JQUERY'S .ANIMATE(), dude
    $(`#button_${i}`).on("click", function(){
      let $coordButton = $(`#button_${i}`).offset();
      $(`#button_${i}`).css("position","fixed");
      $(`#button_${i}`).offset($coordButton);
      $(`#button_${i}`).animate({
        'left': '5%',
        'top': "8%",
        'opacity': 1,
        'height': '47em',
        'width': '90%',
        }, 500, null, function(){//this function work after my animation and it append some content in my block
        $(`#button_${i}`).html(`<div class="currentForecastForDayInterface">
                                <div class="title">
                                  <div class="title-logoButton">
                                      <p>По данным сервиса</p>
                                  </div>
                                  <div class="logo" id="logoSourceButton"></div>
                                </div>
                                <div class="currentForecastForDay">
                                  <div class="forecastData">
                                    <div id="avg_temp"><img src='./images/icons/иконки давления_влажности_ветра цветные для темного фона/ic_temp.svg'/></div>
                                    <div id="wind"><img src='./images/icons/иконки давления_влажности_ветра цветные для темного фона/ic_wind.svg'/></div>
                                    <div id="water"><img src='./images/icons/иконки давления_влажности_ветра цветные для темного фона/ic_water.svg'/></div>
                                    <div id="pressure"><img src='./images/icons/иконки давления_влажности_ветра цветные для темного фона/ic_pressure.svg'/></div>
                                    <div id="humidity"><img src='./images/icons/иконки давления_влажности_ветра цветные для темного фона/ic_humidity.svg'/></div>             
                                  </div>
                                  <div class="phaseOfDay">
                                    <div class="phase">
                                      <div class="phaseTemp" id="morningTemp"></div>
                                      <div id="morningImg"></div>
                                      <div class="nameOfPhase">Утро</div>
                                    </div>
                                    <div class="phase">
                                      <div class="phaseTemp" id="dayTemp"></div>
                                      <div id="dayImg"></div>
                                      <div class="nameOfPhase">День</div>
                                    </div>
                                    <div class="phase">
                                      <div class="phaseTemp" id="eveningTemp"></div>
                                      <div id="eveningImg"></div>
                                      <div class="nameOfPhase">Вечер</div>
                                    </div>
                                    <div class="phase">
                                      <div class="phaseTemp" id="nightTemp"></div>
                                      <div id="nightImg"></div>
                                      <div class="nameOfPhase">Ночь</div>
                                    </div>
                                  </div>       
                                </div>
                              </div>`);
        let source = document.getElementById("logoSourceButton");
        open.appendChild(logo);
        source.appendChild(open);
        let temp = document.getElementById("avg_temp");
        temp.appendChild(avgTemp);
        let wind = document.getElementById("wind");
        wind.appendChild(avgWind);
        let water = document.getElementById("water");
        water.appendChild(avgWater);
        let pressure = document.getElementById("pressure");
        pressure.appendChild(avgPressure);
        let humidity = document.getElementById("humidity");
        humidity.appendChild(avgHumigity);

        let morningTemp = document.getElementById("morningTemp");
        let morningImg = document.getElementById("morningImg");
        morningImg.prepend(forecastMorningIcon);
        morningTemp.prepend(avgTempMorning);

        let dayTemp = document.getElementById("dayTemp");
        let dayImg = document.getElementById("dayImg");
        dayImg.prepend(forecastDayIcon);
        dayTemp.prepend(avgTempDay);

        let eveningTemp = document.getElementById("eveningTemp");
        let eveningImg = document.getElementById("eveningImg");
        eveningImg.prepend(forecastEveningIcon);
        eveningTemp.prepend(avgTempEvening);

        let nightTemp = document.getElementById("nightTemp");
        let nightImg = document.getElementById("nightImg");
        nightImg.prepend(forecastNightIcon);
        nightTemp.prepend(avgTempNight);
      });//this is end of my jquery animation
      $("header").hide();
      $("main").hide();
      $("button").hide();
      $(`#button_${i}`).empty();
      $(`#button_${i}`).show();
  });
  }
  //test
  console.log($);
  let weather = this.response;
  currentWeather.prepend(currentWeatherIcon);
  console.log(weather);
};
oReq.send();