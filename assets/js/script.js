var city = 'Phoenix';
var key = 'c425e93d4af56f1e963263e9bbdce47c';
var todaysTempEl = $('.todaysTemp');

var userInputEl = $('.user-input');
var buttonEl = $('.search-button');

var cityListHist = [];

var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm a');

var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

var tempDetailEl = $('.tempDetail');
function todaysWeather() {
	fetch(weatherUrl).then(function (response) {
		$('.cityName').text(response.name);
		//Displays time on the main card
		$('#currentDay').text(rightNow);
		//Displays icon related to weather
		$('.weatherEmj').attr(
			'src',
			`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
		);
		// Temperature
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		tempDetailEl.append(pEl);
		//Wind
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		tempDetailEl.append(pElWind);
		//Humidity
		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		tempDetailEl.append(pElHumid);
	});
}

todaysWeather();
