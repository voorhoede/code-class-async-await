const fetch = require('node-fetch');

const appid = '4eaa6255';
const appkey = '7ca5432584efca41341e3c73fb914448';

const date = '2017-07-17';
const time = '22:22';

const stationEndpoint = station => `https://transportapi.com/v3/uk/train/station/${station}/${date}/${time}/timetable.json?app_id=${appid}&app_key=${appkey}&train_status=passenger`;
const serviceEndpoint = id => `https://transportapi.com/v3/uk/train/service/${id}/${date}/${time}/timetable.json?app_id=${appid}&app_key=${appkey}&darwin=false&live=false`;

async function getStationServiceIds(station) {
	const response = await fetch(stationEndpoint(station));
	const { departures } = await response.json();
	const serviceIds = departures.all.map(departure => departure.service);
	return serviceIds;
}

async function getServiceStops(serviceId) {
	const response = await fetch(serviceEndpoint(serviceId));
	const { stops } = await response.json();
	const stationNames = stops.map(stop => stop.station_name)
	return stationNames;
}

(async () => {
	const allServices = await getStationServiceIds('WAT');
	const services = allServices.slice(0, 3);
	const servicePromises = services.map(async service => {
		const serviceStops = await getServiceStops(service);
		return { service, stops: serviceStops.slice(0, 3) }
	})
	const serviceWithStops = await Promise.all(servicePromises); 
	console.log(serviceWithStops);
})();