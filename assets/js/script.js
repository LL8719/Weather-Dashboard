var city = 'Phoenix';
var key = 'c425e93d4af56f1e963263e9bbdce47c';
var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
var todaysTempEl = $('.todaysTemp');

var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm a');

function todaysWeather() {
	// console.log(weatherUrl);

	fetch(weatherUrl).then(function (response) {
		$('.cityName').text(response.name);
		$('#currentDay').text(rightNow);
	});
}
todaysWeather();
