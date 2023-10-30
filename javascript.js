const API_ENDPOINT =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";
const API_KEY = "bbd03f474e90d7745d08c76140148620";
const img = document.querySelector(".image");
const searchBox = document.querySelector(".searchbox");
const searchButton = document.querySelector(".searchbutton");

async function checkWeather(city) {
  const response = await fetch(
    API_ENDPOINT + `&q=${city}` + `&appid=${API_KEY}`
  );
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";

  let data = await response.json();
  console.log(data);

  document.querySelector(".city").innerHTML = city;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML =
    "Humidity " + data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + "km/h";

  switch (data.weather[0].main) {
    case "Clouds":
      img.src = "images/clouds.png";
      break;
    case "Drizzle":
      img.src = "images/drizzle.png";
      break;
    case "Mist":
      img.src = "images/mist.png";
      break;
    case "Rain":
      img.src = "images/rain.png";
      break;
    case "Snow":
      img.src = "images/snow.png";
      break;
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
