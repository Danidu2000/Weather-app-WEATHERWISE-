//-------------------------------------------get the location from local storage---------------------------------------- 
function getWeatherData() {
    const location = localStorage.getItem("location"); // Retrieve it from local storage
    fetchWeatherData(location); // Use the value
}

getWeatherData();

//-------------------------------------------set the location to api and fetch data---------------------------------------- 
function fetchWeatherData(location) {
    const apiKey = "b41bdc895fe240b2827171119242909";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=8`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // ----------------------------------------------set data to weatherForecast section-------------------------------------------
            document.getElementById("date").textContent = "Weather forecast for " + data.forecast.forecastday[6].date;
            document.getElementById("weatherIcon").src = data.forecast.forecastday[6].day.condition.icon;
            document.getElementById("location").innerHTML = '<i class="bi bi-geo-alt-fill"></i> ' + data.location.name;
            document.getElementById("temperature-c").textContent = data.forecast.forecastday[6].day.avgtemp_c + "°C";

            document.getElementById("temp_max").textContent = data.forecast.forecastday[6].day.maxtemp_c + "°C" + " / " + data.forecast.forecastday[6].day.maxtemp_f + "°F";
            document.getElementById("temp_min").textContent = data.forecast.forecastday[6].day.mintemp_c + "°C" + " / " + data.forecast.forecastday[6].day.mintemp_f + "°F";
            document.getElementById("wind_max").textContent = data.forecast.forecastday[6].day.maxwind_kph + "kph" + " / " + data.forecast.forecastday[6].day.maxwind_mph + "mph";
            document.getElementById("precip").textContent = data.forecast.forecastday[6].day.totalprecip_mm + "mm" + " / " + data.forecast.forecastday[6].day.totalprecip_in + "in";
            document.getElementById("snow").textContent = data.forecast.forecastday[6].day.totalsnow_cm + "cm";
            document.getElementById("humidity").textContent = data.forecast.forecastday[6].day.avghumidity + "%";

            document.getElementById("visibility").textContent = data.forecast.forecastday[6].day.avgvis_km + "km" + " / " + data.forecast.forecastday[6].day.avgvis_miles + "miles";
            document.getElementById("chance_of_rain").textContent = data.forecast.forecastday[6].day.daily_chance_of_rain + "%";
            document.getElementById("chance_of_snow").textContent = data.forecast.forecastday[6].day.daily_chance_of_snow + "%";
            document.getElementById("condition").textContent = data.forecast.forecastday[6].day.condition.text;
            document.getElementById("uv").textContent = data.forecast.forecastday[6].day.uv;
            document.getElementById("lastUpdated").textContent = "Last Updated: " + data.current.last_updated;

            // ----------------------------------------------set data to astro section-------------------------------------------
            document.getElementById("sunrise").textContent = data.forecast.forecastday[6].astro.sunrise;
            document.getElementById("sunset").textContent = data.forecast.forecastday[6].astro.sunset;
            document.getElementById("moonrise").textContent = data.forecast.forecastday[6].astro.moonrise;
            document.getElementById("moonset").textContent = data.forecast.forecastday[6].astro.moonset;
            document.getElementById("moonphase").textContent = data.forecast.forecastday[6].astro.moon_phase;
            document.getElementById("moonillumination").textContent = data.forecast.forecastday[6].astro.moon_illumination + "%";

            // ----------------------------------------------set data to hourly sections-------------------------------------------

            for (let i = 0; i < 24; i++) {
                document.getElementById("time" + i).textContent = data.forecast.forecastday[6].hour[i].time;
                document.getElementById("weatherIcon" + i).src = data.forecast.forecastday[6].hour[i].condition.icon;
                document.getElementById("location" + i).innerHTML = '<i class="bi bi-geo-alt-fill"></i> ' + data.location.name;
                document.getElementById("temperature-c" + i).textContent = data.forecast.forecastday[6].hour[i].temp_c + "°C";
                document.getElementById("temperature-feels" + i).textContent = "Feels like " + data.forecast.forecastday[6].hour[i].feelslike_c + "°C" + " / " + data.forecast.forecastday[6].hour[i].feelslike_f + "°F";
                document.getElementById("condition" + i).textContent = data.forecast.forecastday[6].hour[i].condition.text;
                document.getElementById("uv" + i).textContent = data.forecast.forecastday[6].hour[i].uv;
                document.getElementById("cloud" + i).textContent = data.forecast.forecastday[6].hour[i].cloud;
                document.getElementById("heatindex" + i).textContent = data.forecast.forecastday[6].hour[i].heatindex_c + "°C" + " / " + data.forecast.forecastday[6].hour[i].heatindex_f + "°F";
                document.getElementById("precip" + i).textContent = data.forecast.forecastday[6].hour[i].precip_mm + "mm" + " / " + data.forecast.forecastday[6].hour[i].precip_in + "in";
                document.getElementById("snow" + i).textContent = data.forecast.forecastday[6].hour[i].snow_cm + "cm";
                document.getElementById("humidity" + i).textContent = data.forecast.forecastday[6].hour[i].humidity + "%";
                document.getElementById("visibility" + i).textContent = data.forecast.forecastday[6].hour[i].vis_km + "km" + " / " + data.forecast.forecastday[6].hour[i].vis_miles + "miles";
                document.getElementById("chance_of_rain" + i).textContent = data.forecast.forecastday[6].hour[i].chance_of_rain + "%";
                document.getElementById("chance_of_snow" + i).textContent = data.forecast.forecastday[6].hour[i].chance_of_snow + "%";
                document.getElementById("wind_speed" + i).textContent = data.forecast.forecastday[6].hour[i].wind_kph + "kph" + " / " + data.forecast.forecastday[6].hour[i].wind_mph + "mph";
                document.getElementById("wind_degree" + i).textContent = data.forecast.forecastday[6].hour[i].wind_degree + "°";
                document.getElementById("wind_direction" + i).textContent = data.forecast.forecastday[6].hour[i].wind_dir;
                document.getElementById("pressure" + i).textContent = data.forecast.forecastday[6].hour[i].pressure_mb + "mb" + " / " + data.forecast.forecastday[6].hour[i].pressure_in + "in";
            }
        });
}
