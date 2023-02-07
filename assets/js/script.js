var apiKey = 'bb54b8b606113e3da27c5bafd590d42f ';
//Todays weather from API
function todaysWeather(city) {
	//variable for API for 1 day weather
	var weatherUrl =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		city +
		'&units=imperial&appid=' +
		apiKey;
	//fetch API url
	fetch(weatherUrl)
		.then((response) => {
			//If the user types an invalid city
			if (!response.ok) {
				alert('No Weather Found!');
			}
			return response.json();
		})
		.then((data) => {
			displayWeather(data);
			forecastWeather(city);
		});
}

//Display of weather on the main card for today
function displayWeather(data) {
	//create variables for the data we are grabbing
	var name = data.name;
	var rightNow = dayjs().format('MMM DD, YYYY');
	var icon = data.weather[0].icon;
	var temp = data.main.temp;
	var humidity = data.main.humidity;
	var wind = data.wind.speed;
	//Pass data from variables to the html
	$('.card-city').text('Weather today in ' + name);
	$('.currentDay').text(rightNow);
	$('.card-icon').attr(
		'src',
		'https://openweathermap.org/img/wn/' + icon + '.png'
	);
	$('.card-temp').text(temp + ' °F');
	$('.card-wind').text('Wind speed: ' + wind + ' MPH');
	$('.card-humid').text('Humidity: ' + humidity + '%');
}
//five day forecast
function forecastWeather(city) {
	//API link changed from 'weather' to 'forecast
	var forecastUrl =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		city +
		'&units=imperial&appid=' +
		apiKey;
	fetch(forecastUrl)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			//created empty array to pass the data after looping over
			var daysArr = [];
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].dt_txt.includes('15:00:00')) {
					daysArr.push(data.list[i]);
				}
			}
			//loop over the array to append to 5 day weather cards

			for (i = 0; i < daysArr.length; i++) {
				var newPDate = daysArr[i].dt_txt.split(' ')[0].split('-');

				var newPTemp = $('<p>').text(
					'Temperature: ' + daysArr[i].main.temp + ' °F'
				);
				var newPWind = $('<p>').text(
					'Wind Speed: ' + daysArr[i].wind.speed + ' MPH'
				);
				var newPHumid = $('<p>').text(
					'Humidity: ' + daysArr[i].main.humidity + '%'
				);
				var newIcon = $('<img>').attr(
					'src',
					'https://openweathermap.org/img/wn/' +
						daysArr[i].weather[0].icon +
						'@2x.png'
				);
				$('#box' + (i + 1)).append(
					newPDate[1] + '-' + newPDate[2] + '-' + newPDate[0]
				);
				$('#box' + (i + 1)).append(newPTemp);
				$('#box' + (i + 1)).append(newPHumid);
				$('#box' + (i + 1)).append(newPWind);
				$('#box' + (i + 1)).append(newIcon);
			}
		});
}

//local storage
var searchHist = JSON.parse(localStorage.getItem('searchHistory')) || [];
function saveCities() {
	if (!searchHist.includes(city)) {
		searchHist.push(city);
		localStorage.setItem('searchHist', JSON.stringify(searchHist));
		makeButton();
	}
}
// Makes new button from user search

function makeButton() {
	//Clears the Html inside of the boxes to avoid duplicates
	$('.box').empty();
	//grabs the user input
	city = $('#search-input').val().trim();
	//creates button with user input
	var newBtn = $('<button>').text(city);
	//adds class for style
	newBtn.addClass('btn  btn-primary histBtn');
	newBtn.attr('id', city);
	newBtn.attr('style', 'margin:3px; width: 50%');
	newBtn.on('click', (event) => {
		$('.box').empty();
		city = event.target.id;
		// forecastWeather(city);
		todaysWeather(city);
	});
	//displays button from search on the screen
	$('#listOfCities').append(newBtn);
}

//Search button event allows for weather to change on main card
$('.search-button').on('click', function (event) {
	event.preventDefault();
	city = $('#search-input').val().trim();
	saveCities();
	todaysWeather(city);
});

todaysWeather('Phoenix');
