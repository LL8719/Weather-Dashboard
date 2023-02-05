var apiKey = 'bb54b8b606113e3da27c5bafd590d42f ';
//Todays weather from API
function todaysWeather(city) {
	var weatherUrl =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		city +
		'&units=imperial&appid=' +
		apiKey;
	fetch(weatherUrl)
		.then((response) => {
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
	var name = data.name;
	var icon = data.weather[0].icon;
	var temp = data.main.temp;
	var humidity = data.main.humidity;

	var wind = data.wind.speed;

	$('.card-city').text('Weather in ' + name);
	$('.card-icon').attr(
		'src',
		'https://openweathermap.org/img/wn/' + icon + '.png'
	);
	$('.card-temp').text(temp + ' °F');
	$('.card-wind').text('Wind speed: ' + wind + ' MPH');
	$('.card-humid').text('Humidity: ' + humidity + '%');
}

function forecastWeather(city) {
	var forecastUrl =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		city +
		'&units=imperial&appid=' +
		apiKey;
	fetch(forecastUrl)
		.then((response) => response.json())
		.then((data) => {
			var daysArr = [];
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].dt_txt.includes('12:00:00')) {
					daysArr.push(data.list[i]);
				}
			}
			//loop over Data to append to 5 day weather cards
			for (i = 0; i < daysArr.length; i++) {
				var newPDate = $('<h4>').text(daysArr[i].dt_txt.split(' ')[0]);
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
				$('#box' + (i + 1)).append(newPDate);
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
	searchHist.push(city);
	localStorage.setItem('searchHist', JSON.stringify(searchHist));
}
// Makes new button from user search
function makeButton() {
	//grabs the user input
	city = $('#search-input').val().trim();
	//creates button with user input
	var newBtn = $('<button>').text(city);
	//adds class for style
	newBtn.addClass('btn  btn-primary');

	newBtn.on('click', () => {
		// todaysWeather(newBtn.text());
	});
	//displays button from search on the screen
	$('#listOfCities').append(newBtn);
}
//Search button event allows for weather to change on main card
$('.search-button').on('click', function (event) {
	event.preventDefault();
	city = $('#search-input').val().trim();
	makeButton();
	saveCities();
	todaysWeather(city);
});

todaysWeather('Phoenix');
