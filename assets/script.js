var APIKey = "f60be35f3eda0b69e1466b12ddac604e"
var citySearch = document.getElementById("cityName");

// onClick function for the search button id. 
$("#searchBtn").on("click", function(event){
    event.preventDefault();


    // takes value from input id #cityName 
    var search=$("#cityName").val().trim();
    console.log(search);

    // sets citySearch variable equal to the input value
    citySearch= search;
    console.log(citySearch);


// end onclick

// run functions below vvv
cityPresent();

});

// cityPresent function.. shows the weather forecast at the present moment.
function cityPresent(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +citySearch+ "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    // end ajax
    })
    
    .then(function(response){
    console.log(response);
    
    var temperature= $("<p>").text("Temperature: "+response.main.temp+"F");
    var humidity = $("<p>").text("Humidity: "+response.main.humidity);
    $("#temp").append(temperature)
    $("#humidity").append(humidity)
    $("#cityReturn").append(citySearch)
    var cityId = response.main.cityId;
    $("#cityID").append(cityId);
    
    //end then(function)
    });

};

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


// Hotel data API

var destinationId = document.getElementById("cityId");
var pageNumber = 1;
var checkIn = "2020-12-08";
var checkOut = "2020-12-15";
var pageSize=25;
var adults1=1;

 const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/properties/list?destinationId="+destinationId+"&pageNumber="+pageNumber+"&checkIn="+checkIn+"&checkOut="+checkOut+"&pageSize="+pageSize+"&adults1="+adults1+"&currency=USD&locale=en_US&sortOrder=PRICE",
	// "url":"https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE",
	"method": "GET",
	"headers": {
	"x-rapidapi-key": "8b8ddf2d71mshf03a9aae2c1ec77p127802jsn64b1b332d9eb",
	"x-rapidapi-host": "hotels4.p.rapidapi.com"
	}
};


$.ajax(settings).done(function (response) {
	console.log(response);
	//display query value
	var destination = response.data.body.query.destination.value;
	$(".query-info").html("<h1>"+destination+"</h1>");

	//display search result
	var result = response.data.body.searchResults.results.length;
	var hotelList = "<ul>"
	for(i=0; i<pageSize; i++){
		console.log(i);
		var hotelName = response.data.body.searchResults.results[i].name;
		var hotelStreetAddress = response.data.body.searchResults.results[i].address.streetAddress;
		var pricePerNight = response.data.body.searchResults.results[i].ratePlan.price.current;
		var totalPrice = response.data.body.searchResults.results[i].ratePlan.price.totalPricePerStay;
		var thumbnailUrl = response.data.body.searchResults.results[i].thumbnailUrl;
		hotelList += "<li><h2>Hotel Name: "+hotelName+"</h2></br>"
		hotelList += "<div class='div-left'><img src='" + thumbnailUrl+"'></img></div>\
		             </li>";
		
	}
	$(".result").html(hotelList);
});