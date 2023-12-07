//select elements

const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature-value p');
const descriptionElement = document.querySelector('.weather-description');
const locationElement = document.querySelector('.location p');

// //App data
const weather = {};
weather.temperature = {
    unit: 'celsius'
};

//Const and variables
const KELVIN = 273;
let cityName = "" ;

//API KEY
const key = "07be30634a515b282b645c0064cc7830";

// Get city name from conf.json file
function getCity() {
    fetch('./conf.json')
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        let cityName = jsonData.cities[0].name;
        getWeather(cityName);
    })
    .catch(err => console.log(err));
}

getCity();

//Get weather from API provider
function getWeather(cityName){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&lang=fr`;
    
    fetch(api)
    .then(function(response){
        let apiData = response.json();
        return apiData;
    })
    .then(function(apiData){
        console.log(apiData);
        weather.temperature.value = Math.floor(apiData.main.temp - KELVIN);
        weather.description = apiData.weather[0].description;
        weather.iconId = apiData.weather[0].icon;
        weather.city = apiData.name;
    })
    .then(function(){
        displayWeather();
    })
}

// //display weather 
function displayWeather() {
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = weather.city;
}