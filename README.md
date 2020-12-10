# PinPoint

A travel web application to display the weather forecast and hotel availability when a user searches for a destination (city).


## Link to Deploy setItem
https://mastakoch.github.io/PinPointProject1/

## Motivation
Based off of past travel experiences, we have found that preparation for a vacation / trip can be tedious. 

For example, if someone wanted to go to Denver, Colorado, they would have to do a lot of research and planning before hopping on a flight and taing a trip there.

One may have to use a weather app to search the forecast for the timeframe that they will be there. 
One may also have to use a hotel / lodging app such as AirBnb or VRBO to search for a place to stay during their trip. 
One may also have to use a car rental application such as Enterprise to rent a car for their trip.
As you can see, there is a lot that goes into planning a trip. But why is it this complex? Why does it require so much time and critical thinking?

For PinPoint, we were motivated to streamline this process to ensure a seamless and efficient travel preparation.


## Build Status

Release status- deployed a page that displays weather forecasts as well as hotel availability for any given city search.


## Screen Shots

vvv Home Page vvv


<img width="1434" alt="Screen Shot 2020-12-10 at 5 34 48 PM" src="https://user-images.githubusercontent.com/72670039/101838076-025a8600-3b0e-11eb-8637-17b37a41dbec.png">

vvv City Search vvv


<img width="497" alt="Screen Shot 2020-12-10 at 5 35 47 PM" src="https://user-images.githubusercontent.com/72670039/101838158-25853580-3b0e-11eb-810d-50234b08d5d2.png">

vvv Weather forecast for city vvv


<img width="1164" alt="Screen Shot 2020-12-10 at 5 36 32 PM" src="https://user-images.githubusercontent.com/72670039/101838220-40f04080-3b0e-11eb-8de3-052d0ad070bc.png">

vvv Hotel availability for city vvv


<img width="1124" alt="Screen Shot 2020-12-10 at 5 37 38 PM" src="https://user-images.githubusercontent.com/72670039/101838324-68dfa400-3b0e-11eb-9139-f3ff33cc72f7.png">



<img width="1114" alt="Screen Shot 2020-12-10 at 5 39 33 PM" src="https://user-images.githubusercontent.com/72670039/101838474-ae03d600-3b0e-11eb-9a15-dcb2782943d3.png">




## Framework Used
Built Using:
 - JavaScript
 - HTML
 - CSS
 - Bootstrap 
 - Google Fonts
 - OpenWeatherAPI (https://openweathermap.org/api)
 - Hotels API by API Dojo (https://rapids pi.com/apidojo/api/hotels4/endpoints)
 
## Features
Input for city search to view weather forecast and hotel availability.

## Code Example
```````````````````````
// start callCity function to call the stored city
function callCity(){
  var cityRecall = JSON.parse(localStorage.getItem("searchStore"));
  var recallReturn = $("<button class='btn btn-success' style='width: 200px'>").text(cityRecall);
  var recallSearch = $("<a>");
  recallSearch.append(recallReturn);
  $("#searchRecall").prepend(recallSearch);
}

// recall city on click
$("#searchRecall").on("click", ".btn", function(event){
 event.preventDefault();
 weatherPresent($(this).text());
 fiveDayForecast($(this).text());
});


function weatherPresent(citySearch){

  const weatherSettings = {
    "url": "https://api.openweathermap.org/data/2.5/weather?q=" +citySearch+ "&units=imperial&appid=" + weatherAPIKey,
    "method": "GET"
  }
    
  $.ajax(weatherSettings).done(function (response) {
    console.log(response);

    var temperature=Math.floor(response.main.temp);
    var humidity=Math.floor(response.main.humidity);
    var hiTemp=Math.floor(response.main.temp_max);
    var loTemp =Math.floor(response.main.temp_min);

    // Write City Name to weather header
    $("#weatherCity").html("<h2>"+citySearch+"</h2>");
    
    // Write weather data to html
    var weatherData = "<ul>"
    weatherData += "<p>Temperature: "+temperature+" F</p>";
    weatherData += "<p>Humidity: "+humidity+" %</p>";
    weatherData += "<p>High For the Day: "+hiTemp+"F</p>"
    weatherData += "<p>Low For the Day: "+loTemp+"F</p>";
    $("#weatherReturn").html(weatherData);
    console.log(citySearch);
  });
}
//end WeatherPresent function
```````````````````````

## Contributors
 - Carla St. Juste
 - Cam Lundy
 - Alex Koch
