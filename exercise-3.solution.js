const fetch = require('node-fetch');

const appid = '4eaa6255';
const appkey = '7ca5432584efca41341e3c73fb914448';

const startLocation = `https://transportapi.com/v3/uk/places.json?app_id=${appid}&app_key=${appkey}&lat=51.4996511&lon=-0.1253933&type=bus_stop,tube_station`;
const endLocation = `https://transportapi.com/v3/uk/places.json?app_id=${appid}&app_key=${appkey}&lat=51.502937&lon=-0.0922627&type=bus_stop,tube_station`;

const journeyEndpoint = (from, to) => `https://transportapi.com/v3/uk/public/journey/from/${from}/to/${to}.json?app_id=${appid}&app_key=${appkey}&service=tfl`;
const locationStr = (location) => `lonlat:${location.longitude},${location.latitude}`;
const firstStation = (allStations) => allStations.member[0];

(async () => {
	const startTime = Date.now();
	const allStartStationsPromise = fetch(startLocation).then(res => res.json());
	const allEndStationsPromise = fetch(endLocation).then(res => res.json());

	const startStation = firstStation(await allStartStationsPromise);
	const endStation = firstStation(await allEndStationsPromise);
	
	const url = journeyEndpoint(locationStr(startStation), locationStr(endStation))
	const journey = await fetch(url).then(res => res.json());
	
	const endTime = Date.now();
	console.log(journey.routes[0]);
	console.log(`\nScript execution time: ${endTime - startTime} miliseconds`);
})()