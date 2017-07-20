const fetch = require('node-fetch');

const appid = '4eaa6255';
const appkey = '7ca5432584efca41341e3c73fb914448';

const date = '2017-07-17';
const time = '22:22';

const stationEndpoint = station => `https://transportapi.com/v3/uk/train/station/${station}/${date}/${time}/timetable.json?app_id=${appid}&app_key=${appkey}&train_status=passenger`;
const serviceEndpoint = id => `https://transportapi.com/v3/uk/train/service/${id}/${date}/${time}/timetable.json?app_id=${appid}&app_key=${appkey}&darwin=false&live=false`;

function getStationServiceIds(station) {
	return fetch(stationEndpoint(station))
		.then(res => res.json())
		.then(data => data.departures.all.map(departure => departure.service));
}

function getServiceStops(serviceId) {
	return fetch(serviceEndpoint(serviceId))
		.then(res => res.json())
		.then(data => data.stops.map(stop => stop.station_name));
}

getStationServiceIds('WAT')
	.then(allServices => {
		const services = allServices.slice(0, 3);
		return Promise.all(services.map(service => {
			return getServiceStops(service)
				.then(stops => ({
					service,
					stops: stops.slice(0, 3)
				}))
		}))
	})
	.then(data => console.log(data));