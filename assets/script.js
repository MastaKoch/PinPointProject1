var APIKey = "f60be35f3eda0b69e1466b12ddac604e"
var citySearch = document.getElementById("cityName");


// Function to show the tabs when selected
function openTab(showTab, tabName) {
  
  // hide all content elements
  var content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // remove active class for all "tabHead" classes
  var tabHead = document.getElementsByClassName("tabHead");
  for (i = 0; i < tabHead.length; i++) {
    tabHead[i].className = tabHead[i].className.replace(" active", "");
  }

  // show active tab content
  document.getElementById(tabName).style.display = "block";
  showTab.currentTarget.tabName += " active";
}
// end openTab function


// onClick function for the search button id. 
$("#searchBtn").on("click", function(event){
  event.preventDefault();

  // takes value from input id #cityName 
  var search=$("#cityName").val().trim();
  console.log(search);

  // sets citySearch variable equal to the input value
  citySearch= search;
  console.log(citySearch);

// run functions below vvv
  weatherPresent();
  hotelPresent(getCityId());
});


// weatherPresent function.. shows the weather forecast at the present moment.
function weatherPresent(){

  const weatherSettings = {
    "url": "https://api.openweathermap.org/data/2.5/weather?q=" +citySearch+ "&units=imperial&appid=" + APIKey,
    "method": "GET"
  }
    
  $.ajax(weatherSettings).done(function (response) {
    console.log(response);

    var temperature=response.main.temp;
    var humidity=response.main.humidity;
    $("#weatherCity").html("<h2>"+citySearch+"</h2>");

    var weatherData = "<ul>"
    weatherData += "<p>Temperature: "+temperature+"</p>";
    weatherData += "<p>Humidity: "+humidity+"</p>";
    $("#weatherReturn").html(weatherData);
    
  });
}


// Hotel data API

// get city ID and set it to session storage to be used in hotelPresent function
function getCityId(){

  // settings for ajax function
  const citySearchSettings = {
    "async": false,
    "crossDomain": true,
    "url": "https://hotels4.p.rapidapi.com/locations/search?query="+citySearch+"&locale=en_US",
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "de5dfa254emsh75dd89a45134becp1c1f91jsn3f038a2bfd7e",
      "x-rapidapi-host": "hotels4.p.rapidapi.com"
    }
  };
  
  // ajax to call response from input
  $.ajax(citySearchSettings).done(function (response) {
    console.log(response);
    var cityId = response.suggestions[0].entities[0].destinationId;
    // add value to sessionStorage to be able to call it in a later function outside of ajax
    sessionStorage.setItem("cityId", response.suggestions[0].entities[0].destinationId);
    console.log(cityId);
  });
}

// function to return hotel data
function hotelPresent(){
  // Pull cityId from the session storage written in getCityId function
  var destId = sessionStorage.getItem("cityId");
  // var destId = "1528090";
  var pageNumber = 1;
  var checkIn = "2020-12-08";
  var checkOut = "2020-12-15";
  var pageSize=5;
  var adults1=1;

  // settings for ajax function
  const settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId="+destId+"&pageNumber="+pageNumber+"&checkIn="+checkIn+"&checkOut="+checkOut+"&pageSize="+pageSize+"&adults1="+adults1+"&currency=USD&locale=en_US&sortOrder=PRICE",
    // "url":"https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE",
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "8b8ddf2d71mshf03a9aae2c1ec77p127802jsn64b1b332d9eb",
      "x-rapidapi-host": "hotels4.p.rapidapi.com"
    }

  };

  // ajax to call response from input
  $.ajax(settings).done(function (response) {
    console.log(response);
    //display query value
    // var destination = response.data.body.query.destination.value;

    // write data back to html
    $("#hotelCity").html("<h2>"+citySearch+"</h2>");

    //display search result
    var result = response.data.body.searchResults.results.length;
    var hotelList = "<dl>"
    for(i=0; i<pageSize; i++){
      //var reviewRating = response.data.body.searchResults.results[i].guestReviews.rating;
      //var reviewRaging = getRating(response.data.body.results[i]);
      //var reviewScale = response.data.body.searchResults.results[i].guestReviews.scale;
      //var reviewTotal = response.data.body.searchResults.results[i].guestReviews.total;
      console.log(i);
      var hotelName = response.data.body.searchResults.results[i].name;
      var hotelStreetAddress = response.data.body.searchResults.results[i].address.streetAddress;
      var hotelLocality = response.data.body.searchResults.results[i].address.locality;
      var hotelRegion = response.data.body.searchResults.results[i].address.region;
      var hotelPostalCode = response.data.body.searchResults.results[i].address.postalCode;
      var pricePerNight = response.data.body.searchResults.results[i].ratePlan.price.current;
      var totalPrice = response.data.body.searchResults.results[i].ratePlan.price.totalPricePerStay;
      var thumbnailUrl = response.data.body.searchResults.results[i].thumbnailUrl;
      hotelList += "<dt><h3>Hotel Name: "+hotelName+"</h3></br>";
      hotelList += "<div class='div-left'><img src='" + thumbnailUrl+"'></img>"
      hotelList += "<p id='address'>"+ hotelStreetAddress + "<br>" +hotelLocality+", "+hotelRegion+" "+hotelPostalCode+"</p></div></dt>";
      
    }
    // write data back to html
    $("#hotelReturn").html(hotelList);

  });
}