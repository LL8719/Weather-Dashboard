var foreCast = {
	apiKey: 'bb54b8b606113e3da27c5bafd590d42f',
	todaysWeather: function (city) {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&units=imperial&appid=' +
				this.apiKey
		)
			// .then((response) => response.json())
			// 	.then((data) => console.log(data))

			.then((response) => {
				if (!response.ok) {
					alert('No weather found.');
					throw new Error('No weather found.');
				}
				return response.json();
			})
			.then((data) => {
				this.makeButton(city);
				this.forecastWeather(city);
				this.displayWeather(data);
			});
	},
	displayWeather: function (data) {
		var name = data.name;
		console.log(data);
		var icon = data.weather[0].icon;
		console.log(icon);
		var temp = data.main.temp;
		console.log(temp);
		var humidity = data.main.humidity;
		console.log(humidity);
		var { speed } = data.wind;
		console.log(speed);
		$('.card-city').text('Weather in ' + name);
		$('.card-icon').attr(
			'src',
			'https://openweathermap.org/img/wn/' + icon + '.png'
		);
		$('.card-temp').text(temp + ' °F');
		$('.card-wind').text('Wind speed: ' + speed + ' MPH');
		$('.card-humid').text('Humidity: ' + humidity + '%');
	},
	forecastWeather: function (city) {
		fetch(
			'https://api.openweathermap.org/data/2.5/forecast?q=' +
				city +
				'&units=imperial&appid=' +
				this.apiKey
		)
			.then((res) => res.json())
			.then((data) => {
				const organizedArr = [];
				for (i = 0; i < data.list.length; i++) {
					if (data.list[i].dt_txt.includes('12:00:00')) {
						organizedArr.push(data.list[i]);
					}
				}
				this.displayForecast(organizedArr);
			});
	},
	displayForecast: function (arr) {
		console.log(arr);
		for (i = 0; i < arr.length; i++) {
			var newPDate = $('<h4>').text(arr[i].dt_txt.split(' ')[0]);
			var newPTemp = $('<p>').text('Temperature: ' + arr[i].main.temp + ' °F');
			var newPWind = $('<p>').text('Wind Speed: ' + arr[i].wind.speed + ' MPH');
			var newPHumid = $('<p>').text('Humidity: ' + arr[i].main.humidity + '%');
			var newIcon = $('<img>').attr(
				'src',
				'https://openweathermap.org/img/wn/' +
					arr[i].weather[0].icon +
					'@2x.png'
			);
			$('#box' + (i + 1)).append(newPDate);
			$('#box' + (i + 1)).append(newPTemp);
			$('#box' + (i + 1)).append(newPHumid);
			$('#box' + (i + 1)).append(newPWind);
			$('#box' + (i + 1)).append(newIcon);
		}
	},
	makeButton: function (string) {
		var newBtn = $('<button>').text(string);
		newBtn.on('click', () => {
			this.todaysWeather(newBtn.text());
		});

		$('#listOfCities').append(newBtn);
	},
	search: function () {
		this.todaysWeather($('.search-input').val().trim());
	},
};

$('.search-button').on('click', function () {
	foreCast.search();
});

foreCast.todaysWeather('Phoenix');
