// 1. DEFINE YOUR API KEY HERE (Replace the text inside quotes with your actual WeatherAPI Dashboard Key)


// 2. GET HTML ELEMENTS
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weatherResult");

// 3. HANDLE FORM SUBMISSION
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    // Validate that the user actually typed a city name
    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading weather...";
    weatherResult.hidden = true;

    try {
        // FIXED: Clean string concatenation without backticks, using the proper endpoint
        const url = 'https://api.weatherapi.com/v1/current.json?key=' + API_KEY + '&q=' + encodeURIComponent(city) + '&aqi=no';

        const response = await fetch(url);
        const data = await response.json();

        // If the server rejects the request (e.g., city not found), catch the error message
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Unable to get weather."
            );
        }

        // 4. UPDATE HTML TEMPLATE WITH LIVE DATA
        document.getElementById("cityName").textContent =
            data.location.name + ", " + data.location.country;

        document.getElementById("temperature").textContent =
            data.current.temp_c + "°C";

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("feelsLike").textContent =
            data.current.feelslike_c + "°C";

        document.getElementById("humidity").textContent =
            data.current.humidity + "%";

        document.getElementById("wind").textContent =
            data.current.wind_kph + " km/h";

        document.getElementById("updated").textContent =
            "Last updated: " + data.current.last_updated;

        // Show the results container and hide any loading messages
        weatherResult.hidden = false;
        message.textContent = "";

    } catch (error) {
        // Handle network drops or API errors safely
        message.textContent =
            error.message === "Failed to fetch"
                ? "Network error. Please check your connection."
                : error.message;

        weatherResult.hidden = true;
    }
});
