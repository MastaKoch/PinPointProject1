var weatherAPIKey = "f60be35f3eda0b69e1466b12ddac604e"
// var citySearch = document.getElementById("cityName");


// Function to show the tabs when selected
function openTab(showTab, tabName) {
  
  // hide all content elements
  var content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // remove active class for all "tabHead" classes
  var appOption = document.getElementsByClassName("appOption");
  for (i = 0; i < appOption.length; i++) {
    appOption[i].className = appOption[i].className.replace(" active", "");
  }

  // show active tab content
  document.getElementById(tabName).style.display = "block";
  showTab.currentTarget.tabName += " active";
}
// end openTab function


// onClick function for the weather search button. 
$("#searchBtn").on("click", function(event){
  event.preventDefault();

  // hide modal on search click
  $(".modal").hide();

  // takes value from input id #cityName 
  var search=$("#cityName").val().trim();

  var getInput = $(this).siblings("input").val();
  var cityStorageArr = [];
  cityStorageArr.push(getInput);
  localStorage.setItem("searchStore", JSON.stringify(cityStorageArr));
  console.log(search);

  // sets citySearch variable equal to the input value
  citySearch= search;
  console.log(citySearch);

// run functions below vvv
  weatherPresent(search);
  callCity();
});
// end weather onClick function

// start callCity function to call the stored city
function callCity(){
   var cityRecall = JSON.parse(localStorage.getItem("searchStore"));
   var recallReturn = $("<button class='btn btn-success' style='width: 200px'>").text(cityRecall);
   var recallSearch = $("<a>");
   recallSearch.append(recallReturn);
   $("#searchRecall").append(recallSearch);
}

// recall city on click
$("#searchRecall").on("click", ".btn", function(event){
  event.preventDefault();
  weatherPresent($(this).text());
});


// onClick function for the Hotel search button. 
$("#searchHotelBtn").on("click", function(event){
  event.preventDefault();

  $(".SearchHotelResult").show();
  // takes value from input id #HotelCityName 
  var searchHotel = $("#HotelCityName").val().trim();
  console.log(searchHotel);

  // takes value from input id #CheckinDate 
  var CheckinDate = $("#CheckinDate").val().trim();
  console.log(CheckinDate);

  // takes value from input id #CheckOutDate 
  var CheckOutDate = $("#CheckOutDate").val().trim();
  console.log(CheckOutDate);

   // takes value from input id #NumberOfTravelers 
   var NumberOfTravelers = $("#NumberOfTravelers").val().trim();
   console.log(NumberOfTravelers);

// run functions below 
  GetDestinationID(searchHotel, CheckinDate, CheckOutDate, NumberOfTravelers );
  
});
// end Hotel onClick function



// start GetDestinationID function
function GetDestinationID(searchHotel, CheckinDate, CheckOutDate, NumberOfTravelers){

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://hotels4.p.rapidapi.com/locations/search?query="+searchHotel+"&locale=en_US",
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "de5dfa254emsh75dd89a45134becp1c1f91jsn3f038a2bfd7e",
      "x-rapidapi-host": "hotels4.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    var cityId= response.suggestions[0].entities[0].destinationId;
    console.log(cityId);
    console.log(response);

    pageNumber = 1;
    pageSize = 5;

    getHotelList(cityId, CheckinDate, CheckOutDate, NumberOfTravelers, pageNumber, pageSize);
  });
}
// end GetDestinationID function

// start getHotelList function
function getHotelList(CityId, checkIn, checkOut, adults1, pageNumber, pageSize) {

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId="+CityId+"&pageNumber="+pageNumber+"&checkIn="+checkIn+"&checkOut="+checkOut+"&pageSize="+pageSize+"&adults1="+adults1+"&currency=USD&locale=en_US&sortOrder=PRICE",
    // "url":"https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE",
    "method": "GET",
    "headers": {
    "x-rapidapi-key": "de5dfa254emsh75dd89a45134becp1c1f91jsn3f038a2bfd7e",
    "x-rapidapi-host": "hotels4.p.rapidapi.com"
    }

  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    //display query value
    var destination = response.data.body.query.destination.value;
    $("#hotelCity").html("<h2>"+destination+"</h2>");

    //display search result
    var result = response.data.body.searchResults.results.length;
    var hotelList = "<ul>"
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
      var checkInDay = new Date(checkIn);
      var checkOutDay = new Date(checkOut);
      const dateDifference = checkOutDay.getTime() - checkInDay.getTime();
      var days = dateDifference/(1000 * 3600 * 24);
      if(days == 1){
        var totalPrice = pricePerNight;
      } 
      else{
        var totalPrice = response.data.body.searchResults.results[i].ratePlan.price.totalPricePerStay;
      }

      var thumbnailUrl = response.data.body.searchResults.results[i].thumbnailUrl;
      hotelList += "<dt><img src='" + thumbnailUrl+"'><div class='div-left'><h3>Hotel Name: "+hotelName+"</h3>";
      hotelList += "<span> Price per Night:  "+pricePerNight+"<br> Total Price: "+totalPrice+" <br>";
      hotelList += "Address: <br>"+ hotelStreetAddress + "<br>" +hotelLocality+", "+hotelRegion+" "+hotelPostalCode+"</span></div></dt>";
    
    }

    $(".SearchHotelResult").html(hotelList);
  });

}
// end getHotelList function

function weatherPresent(citySearch){

  const weatherSettings = {
    "url": "https://api.openweathermap.org/data/2.5/weather?q=" +citySearch+ "&units=imperial&appid=" + weatherAPIKey,
    "method": "GET"
  }
    
  $.ajax(weatherSettings).done(function (response) {
    console.log(response);

    var temperature=response.main.temp;
    var humidity=response.main.humidity;

    // Write City Name to weather header
    $("#weatherCity").html("<h2>"+citySearch+"</h2>");
    
    // Write weather data to html
    var weatherData = "<ul>"
    weatherData += "<p>Temperature: "+temperature+" F</p>";
    weatherData += "<p>Humidity: "+humidity+" %</p>";
    $("#weatherReturn").html(weatherData);
  
  });
}
//end WeatherPresent function