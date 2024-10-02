document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");  // Check if the script is running

    const apiKey = "3a7354bb75a6402c920221627241508";
    const searchButton = document.getElementById("search");
    const cityInput = document.getElementById("city");
    const cityName = document.querySelector(".city-name");
    const dateTime = document.querySelector(".date-time");
    const temperatureSpan = document.querySelector(".temperature-value");
    const conditionSpan = document.querySelector(".condition-text");
    const humiditySpan = document.querySelector(".humidity-value");
    const windSpeedSpan = document.querySelector(".wind-speed-value");
    const pressureSpan = document.querySelector(".pressure-value");
    const cloudinessSpan = document.querySelector(".cloudiness-value");
    const visibilitySpan = document.querySelector(".visibility-value");
    const weatherInfo = document.querySelector(".weather-info");

    weatherInfo.style.display = "none";  // Hide weather info initially

    searchButton.addEventListener("click", function () {
        const city = cityInput.value.trim();  // Trim extra spaces
        if (city) {
            console.log("Fetching weather data for:", city);  // Log the city input
            fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");  // Handle API errors
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error.message);  // Handle city not found
                    }
                    const location = data.location.name;
                    const country = data.location.country;
                    const temperature = data.current.temp_c;
                    const condition = data.current.condition.text;
                    const localTime = data.location.localtime;
                    const humidity = data.current.humidity;
                    const windSpeed = data.current.wind_kph;
                    const pressure = data.current.pressure_mb;
                    const cloudiness = data.current.cloud;
                    const visibility = data.current.vis_km;

                    cityName.textContent = `${location}, ${country}`;
                    dateTime.textContent = `Local Time: ${localTime}`;
                    temperatureSpan.textContent = `${temperature}°C`;
                    conditionSpan.textContent = condition;
                    humiditySpan.textContent = `${humidity}%`;
                    windSpeedSpan.textContent = `${windSpeed} km/h`;
                    pressureSpan.textContent = `${pressure} hPa`;
                    cloudinessSpan.textContent = `${cloudiness}%`;
                    visibilitySpan.textContent = `${visibility} km`;

                    weatherInfo.style.display = "block";  // Show weather info
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    cityName.textContent = "City not found or an error occurred.";
                    dateTime.textContent = "";
                    temperatureSpan.textContent = "";
                    conditionSpan.textContent = "";
                    humiditySpan.textContent = "";
                    windSpeedSpan.textContent = "";
                    pressureSpan.textContent = "";
                    cloudinessSpan.textContent = "";
                    visibilitySpan.textContent = "";
                    weatherInfo.style.display = "none";  // Hide weather info on error
                });
        } else {
            alert("Please enter a city name!");  // Alert user if input is empty
        }
    });
});
