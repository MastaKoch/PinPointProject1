var APIKey = "f60be35f3eda0b69e1466b12ddac604e"
var citySearch = document.getElementById("cityName");

var triposoKey = "798fp9c0bda347pbmco5inxtw6ko4oje";


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
    
    //end then(function)
    });

    function searchLocation(){
        // takes value from input  
        var search=$("#hotel-search").val().trim();
    
        // sets hotelSearch variable equal to the input value
        hotelSearch= search;
        console.log(hotelSearch);
    
        // run functions below vvv
        DisplaySearchSuggestion();
    }};