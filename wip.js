async function getWeather() {
    const city = document.getElementById('city').value;
    
    if (!city) {
        alert('Please enter a city');
        return;
    }

    try {
        // Open-Meteo API - Fetching geolocation (latitude and longitude) of the city
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`);
        const geoData = await geoResponse.json();
        
        if (geoData.results.length === 0) {
            alert('City not found. Please check the city name.');
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Fetch the current weather from Open-Meteo API using the coordinates
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current_weather;

        // Display the result
        document.getElementById('result').innerHTML = `
            <strong>Weather in ${city}:</strong><br>
            Temperature: ${currentWeather.temperature}°C<br>
            Windspeed: ${currentWeather.windspeed} km/h<br>
           
        `;
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again later.');
    }
}
