getLocation();

// -------------------------------------------------updateLocalTime-----------------------------

function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time");
  const now = new Date();

  localTimeElement.textContent = `${now.toLocaleTimeString()}`;
}

updateLocalTime();

setInterval(updateLocalTime, 1000);

//-------------------------------------------handleSearch---------------------------------------- 


function handleSearch() {
  const location = document.getElementById("txtSearch").value;
  fetchWeatherData(location);
}

document.getElementById("btnSearch").addEventListener("click", handleSearch);

//-------------------------------------------set the location to api and fetch data---------------------------------------- 
function fetchWeatherData(location) {
  const apiKey = "e19669324c9140978cc132740242908";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=8`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      latitude = data.location.lat;
      longitude = data.location.lon;

      document.getElementById("temperature-c").textContent = data.current.temp_c + "°C";
      document.getElementById("location").innerHTML = '<i class="bi bi-geo-alt-fill"></i> ' + data.location.name;
      document.getElementById("temperature-feels").textContent = "Feels like " + data.current.feelslike_c + "°C" + " / " + data.current.feelslike_f + "°F";
      document.getElementById("tz_id").textContent = data.location.tz_id;
      document.getElementById("temp_c").textContent = data.current.temp_c + "°C" + " / " + data.current.temp_f + "°F";
      document.getElementById("humidity").textContent = data.current.humidity + "%";
      document.getElementById("wind_kph").textContent = data.current.wind_kph + "kph" + " / " + data.current.wind_mph + "mph";
      document.getElementById("condition").textContent = data.current.condition.text;
      document.getElementById("region").textContent = data.location.region;
      document.getElementById("country").textContent = data.location.country;
      document.getElementById("weatherIcon").src = data.current.condition.icon;
      document.getElementById("lastUpdated").textContent = "Last Updated: " + data.current.last_updated;

      document.getElementById("txtSearch").value = "";

      for (let i = 1; i < 8; i++) {
        document.getElementById("date" + i).textContent = data.forecast.forecastday[i].date;
        document.getElementById("condition" + i).textContent = data.forecast.forecastday[i].day.condition.text;
        document.getElementById("temp" + i).textContent = data.forecast.forecastday[i].day.avgtemp_c + "°C";
        document.getElementById("weatherIcon" + i).src = data.forecast.forecastday[i].day.condition.icon;
      }
      //-------------------------------------------pass the location to local storage---------------------------------------- 
      function fetchLocation() {
        let location = data.location.name;
        localStorage.setItem("location", location);
      }
      fetchLocation();

      showMap(latitude, longitude);

    });


}

//-------------------------------------------get current location---------------------------------------- 
let latitude;
let longitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);
}

document.getElementById("btnReset").addEventListener("click", getLocation);

// -------------------------------------------------handle the functions of history weather section----------------------------------------
document.getElementById("btnHistorySearch").addEventListener("click", function () {
  const inputDate = document.getElementById("txtHistorySearch").value;
  isDateWithinPastYear(inputDate);
});

// --------------------check the date is within the past 365 days---------------------
function isDateWithinPastYear(inputDate) {

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setDate(today.getDate() - 365);

  const parsedDate = new Date(inputDate); // Convert the string input to a Date object

  if (parsedDate < oneYearAgo || parsedDate > today) {
    alert('Please enter a date within the past 365 days.');
  } else {
    function fetchInputDate() {
      let inputDateStore = inputDate;
      localStorage.setItem("inputDate", inputDateStore);
    }
    fetchInputDate();
    function getWeatherData() {
      const location = localStorage.getItem("location"); // Retrieve it from local storage
      fetchHistoryWeatherData(inputDate, location); // Use the value
    }
    getWeatherData();
  }
}

function fetchHistoryWeatherData(inputDate, location) {
  const apiKey = "e19669324c9140978cc132740242908";
  const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${inputDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      document.getElementById("temperature-c_history").textContent = data.forecast.forecastday[0].day.avgtemp_c + "°C";
      document.getElementById("weatherIcon_history").src = data.forecast.forecastday[0].day.condition.icon;
      document.getElementById("location_history").innerHTML = '<i class="bi bi-geo-alt-fill"></i> ' + data.location.name;
      document.getElementById("condition_history").textContent = data.forecast.forecastday[0].day.condition.text;
      document.getElementById("uv_history").textContent = data.forecast.forecastday[0].day.uv;
      document.getElementById("humidity_history").textContent = data.forecast.forecastday[0].day.avghumidity + "%";
      document.getElementById("wind_max_history").textContent = data.forecast.forecastday[0].day.maxwind_kph + "kph";
      document.getElementById("visibility_history").textContent = data.forecast.forecastday[0].day.avgvis_km + "km";
      document.getElementById("precip_history").textContent = data.forecast.forecastday[0].day.totalprecip_mm + "mm";
      document.getElementById("snow_history").textContent = data.forecast.forecastday[0].day.totalsnow_cm + "cm";

    });
}

// --------------------------------------------------Initialize the map variable------------------------------------------
let map = L.map('map').setView([0, 0], 2); // Default view to center of the earth

// --------------------------------------------------Add OpenStreetMap layer to the map------------------------------------
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker;

// ----------------------------------------------Function to display the map with a marker---------------------------------
function showMap(latitude, longitude) {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  // Check if marker exists, then update, else create a new one
  if (marker) {
    marker.setLatLng([lat, lon]).update();
  } else {
    marker = L.marker([lat, lon]).addTo(map);
  }

  // Center the map view on the new marker
  map.setView([lat, lon], 13);
}

// -------------------------------------------------handle the functions of news weather section----------------------------------------
function fetchNews() {
  // Get the current date
  const currentDate = new Date();

  // Subtract one day to get yesterday's date
  currentDate.setDate(currentDate.getDate() - 1);

  // Extract year, month, and day from the updated date (yesterday)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Initialize a variable with yesterday's date formatted as YYYY-MM-DD
  const yesterdayDate = `${year}-${month}-${day}`;

  const apiKey = "106ad4fd23d24006a6267873fc97dca9";
  const apiUrl = `https://newsapi.org/v2/everything?q=weather&from=${yesterdayDate}&sortBy=publishedAt&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Check if data.articles exists and contains at least 3 articles
      if (data.articles && data.articles.length >= 3) {
        for (let i = 1; i < 4; i++) {
          document.getElementById("newsImg" + i).src = data.articles[i].urlToImage;
          document.getElementById("newsTitle" + i).textContent = data.articles[i].title;
          document.getElementById("newsDesc" + i).textContent = data.articles[i].description;
          document.getElementById("btnNews" + i).href = data.articles[i].url;
          document.getElementById("newsPub" + i).textContent = new Date(data.articles[i].publishedAt).toLocaleString();
        }
      } else {
        console.error("No articles found or not enough articles in the response.");
      }
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
}

fetchNews();
