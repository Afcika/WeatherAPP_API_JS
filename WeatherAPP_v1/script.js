
const weatherForm = document.querySelector(".weatherForm");
const Cityinput= document.querySelector(".Cityinput");
const card= document.querySelector(".card");

const apikey = "18283ecee5f08d815c0bc12c24692457";

weatherForm.addEventListener("submit",async event =>{

  event.preventDefault();

  const city = Cityinput.value;
  if(city){
    try{
        const weatherData = await getWratherData(city);
        displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }

  }
  else{
    displayError("please enter city");
  }

});

async function getWratherData(city){
const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
const response = await fetch(apiurl);

if(!response.ok){
  throw new Error("no fetch")
}
return await response.json();

}


function displayWeatherInfo(data){

  const{name: city,
        main:{temp, humidity},
        weather:[{description, id}]} = data;

  card.textContent ="";
  card.style.display="flex";

  const CityDisplay =document.createElement("h1");
  const TempDisplay =document.createElement("p");
  const Humidity =document.createElement("p");
  const descDisplay =document.createElement("p");
  const weatheremojy =document.createElement("p");

  CityDisplay.textContent = city;
  TempDisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
  Humidity.textContent = ` Humidity :${humidity}`;
  descDisplay.textContent = description;
  weatheremojy.textContent = getWeatherEmoji(id);


  CityDisplay.classList.add("CityDisplay");
  TempDisplay.classList.add("TempDisplay");
  Humidity.classList.add("Humidity");
  descDisplay.classList.add("descDisplay");
  weatheremojy.classList.add("weatheremojy");
  card.appendChild(CityDisplay);
  card.appendChild(TempDisplay);
  card.appendChild(Humidity);
  card.appendChild(descDisplay);
  card.appendChild(weatheremojy);
}

function getWeatherEmoji(weatherid){

  switch(true){
    case(weatherid >=200&& weatherid<300):
    return "⛈️";
    case(weatherid >=300&& weatherid<400):
    return "🌧️";
    case(weatherid >=500&& weatherid<600):
    return "🌩️";
    case(weatherid >=600&& weatherid<700):
    return "❄️";
    case(weatherid >=700&& weatherid<800):
    return "🌫️";
    case(weatherid ===800):
    return "🌞";
    case(weatherid >=801&& weatherid<810):
    return "🌥️";
    default:
      return"❓";
  }

}

function displayError(message){

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}