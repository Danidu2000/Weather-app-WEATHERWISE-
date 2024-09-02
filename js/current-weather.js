//-------------------------------------------get the location from local storage---------------------------------------- 
function getWeatherData() {
    const location = localStorage.getItem("location"); // Retrieve it from local storage
    fetchWeatherData(location); // Use the value
  }

  getWeatherData();

//-------------------------------------------set the location to api and fetch data---------------------------------------- 
  function fetchWeatherData(location) {
    const apiKey = "e19669324c9140978cc132740242908";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=8`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("temperature-c").textContent = data.current.temp_c + "°C";
        document.getElementById("location").innerHTML = '<i class="bi bi-geo-alt-fill"></i> ' + data.location.name;
        document.getElementById("temperature-feels").textContent = "Feels like " + data.current.feelslike_c + "°C" + " / " + data.current.feelslike_f + "°F";
        document.getElementById("tz_id").textContent = data.location.tz_id;
        document.getElementById("region").textContent = data.location.region;
        document.getElementById("country").textContent = data.location.country;
        document.getElementById("weatherIcon").src = data.current.condition.icon;   
        document.getElementById("lastUpdated").textContent = "Last Updated: " + data.current.last_updated;
        document.getElementById("condition").textContent = data.current.condition.text;
        document.getElementById("uv").textContent = data.current.uv;
        document.getElementById("temp_c").textContent = data.current.temp_c + "°C" + " / " + data.current.temp_f + "°F";
        document.getElementById("heatindex").textContent = data.current.heatindex_c + "°C" + " / " + data.current.heatindex_f + "°F";
        document.getElementById("wind_speed").textContent = data.current.wind_kph + "kph" + " / " + data.current.wind_mph + "mph";
        document.getElementById("humidity").textContent = data.current.humidity + "%";
        document.getElementById("pressure").textContent = data.current.pressure_mb + "mb" + " / " + data.current.pressure_in + "in";
        document.getElementById("wind_degree").textContent = data.current.wind_degree + "°";
        document.getElementById("wind_direction").textContent = data.current.wind_dir;
        document.getElementById("Windchill").textContent = data.current.windchill_c + "°C" + " / " + data.current.windchill_f + "°F";
        document.getElementById("dewpoint").textContent = data.current.dewpoint_c + "°C" + " / " + data.current.dewpoint_f + "°F";

    });
  }
  