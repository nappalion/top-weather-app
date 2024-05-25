/*
Create a weather forecast site using the weather 
API from the previous lesson. You should be able 
to search for a specific location and toggle 
displaying the data in Fahrenheit or Celsius.

You should change the look of the page 
based on the data, maybe by changing the 
color of the background or by adding images that 
describe the weather. (You could even use the Giphy 
API to find appropriate weather-related gifs and 
display them). Feel free to use promises or async/await 
in your code, though you should try to become 
comfortable with both.

https://www.weatherapi.com/docs/
*/

const dataButton = document.getElementById("data-button");
const searchInput = document.getElementById("search-input");

const forecastElement = document.getElementById("forecast");
const forecastImgElement = document.getElementById("forecast-img");
const tempElement = document.getElementById("temp");
const convertScaleButton = document.getElementById("convert-scale");

let degreesInC;
let degreesInF;
let tempScale = "F";

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=fa5f82deb7ec4272a2813613242405&q=${searchInput.value}`,
      { mode: "cors" }
    );

    const data = await response.json();
    console.log(data);

    forecastElement.textContent = data.current.condition.text;
    let iconUrl = data.current.condition.icon;
    if (iconUrl.startsWith("//")) {
      iconUrl = "https:" + iconUrl;
    }
    forecastImgElement.src = iconUrl;
    degreesInC = data.current.temp_c.toString() + "C";
    degreesInF = data.current.temp_f.toString() + "F";

    if (tempScale == "F") {
      tempElement.textContent = degreesInC;
    } else {
      tempElement.textContent = degreesInF;
    }
  } catch (e) {
    console.log(e);
  }
}

dataButton.addEventListener("click", getWeather);
convertScaleButton.addEventListener("click", () => {
  if (tempScale == "F") {
    tempScale = "C";
    tempElement.textContent = degreesInC;
  } else {
    tempScale = "F";
    tempElement.textContent = degreesInF;
  }
  console.log(tempScale);
});
