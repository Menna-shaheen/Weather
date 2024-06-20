const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const alertMsg = document.querySelector(".alert");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

apiData("cairo");


async function apiData(city) {
  try {
   
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4dbcd10e8c014e6aa6b132508241206&q=${city}&days=3`
    );
    finalWeatherData = await weatherData.json();
    displayData(weatherData);
    alertMsg.classList.add("d-none");
  } catch (error) {
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4dbcd10e8c014e6aa6b132508241206&q=cairo&days=3`
    );
    finalWeatherData = await weatherData.json();
    displayData(weatherData);
    alertMsg.classList.remove("d-none");
    if (searchInput.value == "") {
      alertMsg.classList.add("d-none");
    }
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (location) {
      // Get the latitude and longitude of the current location
      let latitude = location.coords.latitude
      let longitude = location.coords.longitude
      // Fetch and display weather data for the current location
      getApi(`${latitude},${longitude}`)
  })
}
function displayData(api) {
  var box = "";
  for (let i = 0; i < finalWeatherData.forecast.forecastday.length; i++) {
    let date = new Date(finalWeatherData.forecast.forecastday[i].date);
    if (i == 0) {
      box += 
     `
       <div class="col-lg-4 col-md-8 ">
          <div class=" caaa rounded-2 ">
            <div class="day d-flex justify-content-between p-2">
              <p>${days[date.getDay()]}</p>
              <p>${date.getDate() +' '+ monthNames[date.getMonth()]}</p>
            </div>

            <div class="location px-3 py-1">
              <p>${ finalWeatherData.location.name }</p>
            </div>
            <div class="degree fs-2 px-3 py-1">
              <h1>${Math.floor(finalWeatherData.current.temp_c)}<sup>o</sup>C</h1>
              <p>${Math.floor(finalWeatherData.forecast.forecastday[i].day.mintemp_c)}<sup>o</sup>C</p>
            </div>
            <div class="image">
              <img src="https:${finalWeatherData.current.condition.icon}" alt="">
            </div>
            <div class="state px-3 py-1">
              <p>${finalWeatherData.current.condition.text}</p>
            </div>
            <div class="group d-flex gap-3">
              <div class="hummidity  p-2">
                <img src="Images/icon-umberella.png" alt="">
                <span>${ finalWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
              </div>
              <div class="wind  p-2">
                <img src="Images/icon-wind.png" alt="">
                <span> ${ finalWeatherData.current.wind_kph}</span>
              </div>
              <div class="compass  p-2">
                <img src="Images/icon-compass.png" alt="">
                <span>East</span>
              </div>

            </div>
          </div>
        </div>
     `
      ;
    } else {
   
   box += 
`
 <div class="col-md-8 col-lg-4 ">
          <div class=" caaa rounded-2 ">
            <div class="day text-center p-2">
              <p>${days[date.getDay()]}</p>

            </div>

            <div class="image d-flex justify-content-center align-items-center ">
              <img src="https:${finalWeatherData.forecast.forecastday[i].day.condition.icon}" alt="">
            </div>
            <div class="degree fs-5 p-3 text-center">
              <h5>${Math.floor( finalWeatherData.forecast.forecastday[i].day.maxtemp_c)} <sup>o</sup>C</h5>
              <p>${Math.floor(finalWeatherData.forecast.forecastday[i].day.mintemp_c)}<sup>o</sup>C</p>
            </div>
            <div class="state p-3 text-center">
              <p>${finalWeatherData.forecast.forecastday[i].day.condition.text}</p>
            </div>
          </div>
        </div>
`
     ;
    }
    console.log(finalWeatherData.forecast.forecastday[0].day.mintemp_c);
  }
  document.getElementById("rowData").innerHTML = box;
}
searchBtn.addEventListener("click", function () {
  const term = searchInput.value;
  apiData(term);
  searchInput.value = null; // Clear Search
});

searchInput.addEventListener("input", function () {
  const term = searchInput.value;
  apiData(term);
});
