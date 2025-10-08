import { getJson, getMS } from "./utils_helper.js";


// touch or mouse?
let mql = window.matchMedia("(pointer: fine)");
const pointerFine = mql.matches;

var map;

const LatitudeDefault = 37.8695;
const LongitudeDefault = -122.2699;

//setTimeout(function(){ map.invalidateSize()}, 500);

function createMap() {
	// Where you want to render the map.
	var element = document.getElementById('osm-map');
	// Height has to be set. You can do this in CSS too.
	//element.style = 'height:100vh;';
	// Create Leaflet map on map element.
	map = L.map(element, {
		preferCanvas: true,
		doubleClickZoom: false
	});
	// Add OSM tile layer to the Leaflet map.
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	// Target's GPS coordinates.
	var target = L.latLng(LatitudeDefault, LongitudeDefault); //'37.669', '-122.089'); // hayward 37.6697884,-122.089564

	// Set map's center to target with zoom 14.
	map.setView(target, 14);
	// add geojson precincts to map
}

createMap();
//TODO create JSON files with numerical fields install of all strings

// TODO draw data as we get it route shapes , static schedule, rt vehicles?




// set default chart font color to black
//Chart.defaults.color = '#000';
//Chart.defaults.font.size = 14;

//const selectData = document.querySelector('#selectData');

//const checkActive = document.querySelector('#checkActive');
//const checkAmenity = document.querySelector('#checkAmenity');

//const checkVacant = document.querySelector('#checkVacant');
//const checkLand = document.querySelector('#checkLand');

/*

obj.entity[4].vehicle.trip.trip_id
"9829010"
obj.entity[4].vehicle.trip.direction_id
0
obj.entity[4].vehicle.position
Object { latitude: 37.82561111450195, longitude: -122.20952606201172, bearing: 22, odometer: 0, speed: 0 }
*/

// Try getting vehicle positions once per minute from 511.org
//  https://api.511.org/transit/VehicleMonitoring?api_key=TOKEN511&agency=AC&FORMAT=

/*
function makeVehicle511(v) {
	const mvj = v.MonitoredVehicleJourney;

	const vid = mvj.VehicleRef;
	const direction = mvj.DirectionRef;
	const rt = mvj.LineRef;
	const lat = mvj.VehicleLocation.Latitude;
	const lon = mvj.VehicleLocation.Longitude;

	var des = mvj.DestinationName;

	if (mvj.MonitoredCall) {
		des = mvj.MonitoredCall.DestinationDisplay;
	}

	const tripid = mvj.FramedVehicleJourneyRef.DatedVehicleJourneyRef;

	const veh = { vid: vid, direction: direction, rt: rt, lat: lat, lon: lon, des: des, tripid: tripid, data: '511' };
	return veh;
}
*/
/*
					{
						"RecordedAtTime": "2025-10-06T02:51:47Z",
						"ValidUntilTime": "",
						"MonitoredVehicleJourney": {
							"LineRef": "22",
							"DirectionRef": "E",
							"FramedVehicleJourneyRef": {
								"DataFrameRef": "2025-10-05",
								"DatedVehicleJourneyRef": "7814010"
							},
							"PublishedLineName": "Alcatraz - Peralta - Lakeshore",
							"OperatorRef": "AC",
							"OriginRef": "57566",
							"OriginName": "Addison St & Oxford St",
							"DestinationRef": "56557",
							"DestinationName": "Lakeshore Av & Mandana Blvd",
							"Monitored": true,
							"InCongestion": null,
							"VehicleLocation": {
								"Longitude": "-122.26796",
								"Latitude": "37.8686447"
							},
							"Bearing": "181.0000000000",
							"Occupancy": "seatsAvailable",
							"VehicleRef": "1353",
*/

/*
	{
	"Siri": {
		"ServiceDelivery": {
			"ResponseTimestamp": "2025-10-06T02:51:55Z",
			"ProducerRef": "AC",
			"Status": true,
			"VehicleMonitoringDelivery": {
				"version": "1.4",
				"ResponseTimestamp": "2025-10-06T02:51:55Z",
				"VehicleActivity": [
					*/


/*
async function get511ActVehicles() {
	const TOKEN511 = 'ff6c6152-LOOKITUP';
	const url = 'https://api.511.org/transit/VehicleMonitoring?api_key=' + TOKEN511 +  '&agency=AC&FORMAT=json';

	const siriObj = await getJson(url);


	const vehicles = [];

	


	const vList = siriObj.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;

	for (const v of vList) {

		const veh = makeVehicle511(v);
		vehicles.push(veh)

	}
	return vehicles;
}
*/
//const vehs511 = await get511ActVehicles();
/*
async function getGTFSVehicles() {
	//const url = 'https://api.actransit.org/transit/gtfsrt/vehicles/?token=TOKEN'
	//const url = 'https://api.actransit.org/transit/gtfs/current/?token=TOKEN'
	// ACTRANIST cors problem
	const vehicles = [];

	//const url = "data/actransit/gtfs-rt-vehicles.protobuf";
	//"https://stlrealtimevehicles.alligator.workers.dev/?cacheBust=" +
	const url = 'https://corsproxy.io/?url=https%3A%2F%2Fapi.actransit.org%2Ftransit%2Fgtfsrt%2Fvehicles%2F%3Ftoken%3DTOKEN'
	//new Date().getTime();
	let response = await fetch(url);
	console.log(response);
	if (response.ok) {
		// if HTTP-status is 200-299
		// get the response body (the method explained below)
		const bufferRes = await response.arrayBuffer();
		const pbf = new Pbf(new Uint8Array(bufferRes));
		const obj = FeedMessage.read(pbf);


		for (const ent of obj.entity) {
			const tr = ent.vehicle.trip;
			const lat = ent.vehicle.position.latitude;
			const lon = ent.vehicle.position.longitude;

			const veh = makeVehicle(tr, lat, lon);
			veh.data = 'act gtfsrt'
			vehicles.push(veh);
		}

		return vehicles;
		
		// Return the data in GeoJSON format:
		//return {
		 // type: "FeatureCollection",
		 // features: gtfsArrayToGeojsonFeatures(obj.entity)
	//	};
	 // } else {
	//	console.error("error:", response.status);
	 // }
	}
}
*/
//const gtfsVehicles = await getGTFSVehicles();

/*


const pbfToGeojson = async () => {
	//const url = 'https://api.actransit.org/transit/gtfsrt/vehicles/?token=TOKEN'
	//const url = 'https://api.actransit.org/transit/gtfs/current/?token=TOKEN'
	// ACTRANIST cors problem

	const url = "data/actransit/gtfs-rt-vehicles.protobuf";
	//"https://stlrealtimevehicles.alligator.workers.dev/?cacheBust=" +
	//new Date().getTime();
	let response = await fetch(url);
	console.log(response);
	if (response.ok) {
		// if HTTP-status is 200-299
		// get the response body (the method explained below)
		const bufferRes = await response.arrayBuffer();
		const pbf = new Pbf(new Uint8Array(bufferRes));
		const obj = FeedMessage.read(pbf);

		// Return the data in GeoJSON format:
		return {
			type: "FeatureCollection",
			features: gtfsArrayToGeojsonFeatures(obj.entity)
		};
	} else {
		console.error("error:", response.status);
	}
};

const locations = await pbfToGeojson();
*/

// summary = document.querySelector('#summary');

//const saveanchor = document.getElementById('saveanchor')

function getIcon(name) {
	const icon = new L.Icon({
		//	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/' + name,
		iconUrl: './images/' + name,
		//	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		shadowUrl: './images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});
	return icon;

}

const greenIcon = getIcon('marker-highway-green.png');
const redIcon = getIcon('marker-highway-red.png');
const orangeIcon = getIcon('marker-highway-orange.png');
const yellowIcon = getIcon('marker-highway-yellow.png');
const goldIcon = getIcon('marker-highway-brown.png');
const blueIcon = getIcon('marker-highway-blue.png');
const violetIcon = getIcon('marker-icon-violet.png');

const w3_highway_brown = '#633517';
const w3_highway_red = '#a6001a';
const w3_highway_orange = '#e06000';
const w3_highway_schoolbus = '#ee9600';
const w3_highway_yellow = '#ffab00';
const w3_highway_green = '#004d33';
const w3_highway_blue = '#00477e';

const violet = "#9400d3";//"#EE82EE";

const black = "#000000";

const grey = "#101010";

function getOptionsForMarker(veh) {
	var colorValue;
	var rad = 14;
	var opa = 0.8;

	colorValue = w3_highway_red;

	if (veh.direction == 1) { //|| veh.des.includes("Cal State")) {
		colorValue = w3_highway_orange;
	}
	if (veh.direction == 0) {// veludes("BART")h.des.inc) {
		colorValue = w3_highway_yellow;
	}

	
	if (!pointerFine) {
		rad *= 1.5;
	}
	var fill  = true;
	if (veh.data == 'schedule') {
		fill = false;
	}

	if (veh.data == 'actrt') {
//rad *= 1.5;
	}
	const retval = {
		color: colorValue,
		radius: rad,
		fill: true,
		fillOpacity: opa
	};
	return retval;

}


/*
   service day includes trips that occur on the next calendar day
   ACTransit hours go up to 27:59:59

   if a trip is on a service that includes yesterday, and the starttime HH is either < 25 (yesterday) or (HH-24) < now 
   then it passes the start time test

   if the endtime HH > 23 and (HH-24) > now, then it passed the end time test

*/

function parseTime(str) {
	// convert hh:mm:ss to seconds  hh 0 to 23, mm o to 59 //ss 0 to 59
	const COLON = ':'
	const sParts = str.split(COLON)
	const h = parseInt(sParts[0])
	const m = parseInt(sParts[1])
	//const s = parseInt(sParts[2])

	const seconds = (h * 60 + m); //+ s;
	return seconds
}

const t1 = parseTime('19:53:12');
const t2 = parseTime('19:54:12');

const TOKEN = '7FACCE4112DE7621321F5E518EBC9CB1'
async function getVehicleDelay(vid) {
	// get next stop prediction, compare pred time vs sched time
	// https://api.actransit.org/transit/actrealtime/prediction?top=1&token=....&json=y&vid=1646
	/*
	{"bustime-response":{"error":
	[{"vid":"1646234","msg":"No data found for parameter"}]}}
	*/
	/*
	{"bustime-response":{"prd":map
	[{
		
		"prdtm":"20250928 19:39",
	"schdtm":"20250928 19:34",
	
	"tmstmp":"20250928 19:39","typ":"A","stpnm":"Tennyson Rd & Tampa Av",
	"stpid":"51916","vid":"1646","dstp":165,"rt":"60","rtdd":"60","rtdir":"To Cal State East Bay",
	"des":"Cal State East Bay",
	
	"tablockid":"60001","tatripid":"6076087","origtatripno":"11276516","dly":false,"dyn":0,
	"prdctdn":"Due","zone":"","rid":"6003","tripid":"12919010","tripdyn":0,
	
	"geoid":"5811","seq":8,"psgld":"","stst":70200,"stsd":"2025-09-28","flagstop":0}]}}*/

	const url = 'https://api.actransit.org/transit/actrealtime/prediction?top=1&token=' + TOKEN + '&json=y&vid=' + vid;
	const json = await getJson(url);
	const resp = json["bustime-response"];
	const error = resp.error
	const prd = resp.prd

	if (prd) {
		const schd = prd[0].schdtm;
		const pred = prd[0].prdtm;
		const schdtime = schd.slice(-5)
		const prdtime = pred.slice(-5)

		console.log(schdtime, ' ', prdtime);
		const diff = parseTime(prdtime) - parseTime(schdtime);  // + for late - for early

		return diff
	}
	return null;
}



const pathDataACT = 'actransit/';
//const fNameRoutes = pathDataACT + 'routes.json';
const fNameTrips = pathDataACT + 'trips.json';
const fNameCalendar = pathDataACT + 'calendar.json';
const fNameStops = pathDataACT + 'stops.json';
const fNameStopTimes = pathDataACT + 'stop_times.json';
const fNameShapes = pathDataACT + 'shapes.json';

const pathDataBART = 'bart/';
const fNameShapesBART = pathDataBART + "shapes.json";

async function getDataFile(fName) {
	const file = './data/' + fName;
	const retval = await getJson(file);
	return retval;
}
/*
async function getCSVDataFile(fName) {
	const file = './data/' + fName;
	const retval = await getCSV(file);
	return retval;
}*/
/*
async function getShapes() {
	const file = './data/actransit/shapes.json';
	const retval = await getJson(file);
	return retval;
}*/
getMS();
const shapesJson = await getDataFile(fNameShapes);

const tripsJson = await getDataFile(fNameTrips);

const calendarJson = await getDataFile(fNameCalendar);
const stopsJson = await getDataFile(fNameStops);
const stopTimesJson = await getDataFile(fNameStopTimes);

//const fNameStopTimes = pathDataACT + 'stop_times.txt';

getMS("Reading jsonfiles")
//getMS();
//const shapesJson = await getCSVDataFile('actransit/shapes.txt');
//const stopTimesJson = await getCSVDataFile(fNameStopTimes);
//const csvurl = 'http://127.0.0.1:8083/data/actransit/shapes.txt';

//const shapesCSVJson = await getCSVDataFile( csvurl );

//const tripsJson = await getDataFile(fNameTrips);
//const stopsJson = await getDataFile(fNameStops);
//const stopTimesJson = await getDataFile(fNameStopTimes);

//getMS("Reading csv files ")



/*
shapes is arr of objs ordered by shape_id and shape_pt_sequence
*/
const mapShapeIdToShape = new Map();

function makeGenericSlices(arr, accessorFn, map, msg) {
	const end = arr.length;

	for (var i = 0; i < end; i++) {
		const thisId = accessorFn(arr[i])
		// start a new block
		const begin = i;
		while ((i < end) && (accessorFn(arr[i]) == thisId)) {
			i++;
		}

		const block = arr.slice(begin, i);
		//	console.log( "Block slice ", msg ?? '',  thisId, ' ' , begin, ' ' , i);

		map.set(thisId, block);
		i--;
	}
}
getMS();
const shape60 = shapesJson.filter((s) => (s.shape_id.startsWith('shp-60-')));  //shape_id: "shp-10-01",
makeGenericSlices(shapesJson, (e) => e.shape_id, mapShapeIdToShape, 'shapes');

const mapTripIdToStopTimes = new Map();
makeGenericSlices(stopTimesJson, (e) => e.trip_id, mapTripIdToStopTimes, 'stop times');

//makeShapeSlices(shape60);


//makeShapeSlices(shapesJson);
getMS('Genericslice time:');


// filter based on service id matching today? TODO
const gDayToday = (new Date()).getDay();  // 0 = sunday 

// TODO read calendar dates for exceptions
// https://gtfs.org/documentation/schedule/reference/#calendar_datestxt
// service_ids can be added or deleted for individual days


const mapServiceIdToCalednar = new Map();
calendarJson.forEach(cal => {
	const days = [cal.sunday, cal.monday, cal.tuesday, cal.wednesday, cal.thursday, cal.friday, cal.saturday];
	cal.today = (parseInt(days[gDayToday]) != 0);  // "0" or "1"
	//console.log("service id ", cal.service_id, ' today ' , cal.today);
	mapServiceIdToCalednar.set(cal.service_id, cal)

});

function isServiceIdOperatingToday(service_id) {

	const cal = mapServiceIdToCalednar.get(service_id);

	if (null == cal) {
		console.log("service id not found", service_id);
	}
	const retval = cal.today;

	if (retval) {
		return true;
	}
	return false;
}

const t37 = isServiceIdOperatingToday("37");
const t52 = isServiceIdOperatingToday("52");

// TODO maybe include yesterday for those HH >=24 trips  
const tripsToday = tripsJson.filter((t) => ( /*t.route_id.startsWith('18') &&*/ isServiceIdOperatingToday(t.service_id)));

// make a map from tripid to trip
const mapTripIdToTrip = new Map();
tripsToday.forEach( t=> {
	mapTripIdToTrip.set( parseInt(t.trip_id),t);
});

// make a map to look up by id, note geoid in stops is stop_id in stoptimes
const mapStopIdToStop = new Map();
stopsJson.forEach(st => {
	mapStopIdToStop.set(st.stop_id, st);
})

const mapShapeidToShape = new Map()
function getShape(shape_id) {
	const s = mapShapeidToShape.get(shape_id);
	if (s) return s;

	const news = shapesJson.filter((s) => (s.shape_id == shape_id));
	mapShapeidToShape.set(shape_id, news);
	return news;
}


function getTimesForTrip(trip) {
	//const sts = stopTimesJson.filter((st) => (st.trip_id == trip.trip_id))
	const sts = mapTripIdToStopTimes.get(trip.trip_id)
	trip.start = sts[0].arrival_time;
	trip.end = sts[sts.length - 1].departure_time;

	trip.stop_times = sts;


	//trip.shape = getShape(trip.shape_id)
	trip.shape = mapShapeIdToShape.get(trip.shape_id)

	if (!trip.shape) {
		throw new Error('shape not found for trip ')
	}
}


function getStop(stop_id) {
	const st = mapStopIdToStop.get(stop_id);
	return st



}

function makeVehicle(trip, lat, lon) {
	const veh = { vid: 'static schedule', direction: trip.direction_id, rt: trip.route_id, lat: lat, lon: lon, des: trip.trip_headsign, tripid: trip.trip_id };
	return veh
}

function hhmmssToSeconds(hhcmmcss) {
	// todo midnight crossing
	const arr = hhcmmcss.split(':');
	//const hh = parseInt(arr[0]);
	const [hh, mm, ss] = arr.map((x) => parseInt(x));

	const seconds = hh * 3600 + mm * 60 + ss;
	return seconds;

}

const tv = hhmmssToSeconds('01:02:03'); // 3723


function getShapeGps(shape, shape_dist_traveled) {

	for (const point of shape) {

		if (point.shape_dist_traveled >= shape_dist_traveled) {
			const gps = { lat: point.shape_pt_lat, lon: point.shape_pt_lon }
			return gps;

		}

	}

	return null;
}
/*
var t  = getShapeGps(0,0);
t  = getShapeGps(0,10);
t  = getShapeGps(0,100);
t  = getShapeGps(0,1000);
t  = getShapeGps(0,10000);

*/

function interpolateGPS(trip, thisStopTime, nextStopTime, currentTime) {
	const thisSeconds = hhmmssToSeconds(thisStopTime.arrival_time);
	const nextSeconds = hhmmssToSeconds(nextStopTime.arrival_time);
	const currentSeconds = hhmmssToSeconds(currentTime);

	const total = nextSeconds - thisSeconds;
	const diff = currentSeconds - thisSeconds;

	const w2 = diff / total;
	const w1 = 1.0 - w2;

	const shape_dist_traveled = w1 * thisStopTime.shape_dist_traveled + w2 * nextStopTime.shape_dist_traveled;

	const gps = getShapeGps(trip.shape, shape_dist_traveled);
	return gps;

	/*
		const thisStop =  getStop(thisStopTime.stop_id);
		const nextStop =  getStop(nextStopTime.stop_id);
	
		const lat  = w1 * thisStop.stop_lat + w2 * nextStop.stop_lat;
		const lon =  w1 * thisStop.stop_lon + w2 * nextStop.stop_lon;
	
		return {lat:lat, lon:lon};*/
}

function getVehicleForTrip(trip, currentTime) {
	var thisStopTime = trip.stop_times[0]
	var nextStopTime;
	for (const st of trip.stop_times) {

		if (st.arrival_time >= currentTime) {
			nextStopTime = st;
			break;

		}
		thisStopTime = st;
	}
	// get lat lng for st
	const st = getStop(thisStopTime.stop_id);

	//const veh = makeVehicle("Vehicle for trip " + trip.trip_id, st.stop_lat, st.stop_lon);

	const intgps = interpolateGPS(trip, thisStopTime, nextStopTime, currentTime);
	const veh2 = makeVehicle(trip, intgps.lat, intgps.lon);

	veh2.data = 'schedule';

	return veh2;


}

getMS(null);

tripsToday.forEach(element => {
	//console.log(element.trip_id)
	getTimesForTrip(element);
	//console.log(element.start, element.end)
});

getMS("Set additional trip properties")



function getHHMMSS() {
	const n = new Date(); const ZERO = '0'; const COLON = ':';
	const s = ('' + n.getHours()).padStart(2, ZERO) + COLON + ('' + n.getMinutes()).padStart(2, ZERO) + COLON + ('' + n.getSeconds()).padStart(2, ZERO);
	return s;
}
function compareHHMMSS(a, b) {
	// compre as strings
	return a < b;
}
// look trhu the trips and find which ones are running now, where there are etc, and synthesize vehicles for them

function getStaticVehicles() {
	const currentTime = getHHMMSS();
	const vehicles = [];
	tripsToday.forEach(trip => {
		//console.log(element.trip_id)

		// trips crossing midnight TODO
		if (currentTime >= trip.start) {
			if (currentTime <= trip.end) {
				//console.log("Inluding trip ", element.trip_id)
				const veh = getVehicleForTrip(trip, currentTime)
				vehicles.push(veh)

			}

		}

	});

	return vehicles
}


/*
async function getShapesBart() {
	const file = './data/bart/shapes.json';
	const retval = await getJson(file);
	return retval;
}*/

const shapesBartJson = await getDataFile(fNameShapesBART)

const shapeBart4A = shapesBartJson.filter((s) => (s.shape_id.startsWith('004A_shp')));  //shape_id: "shp-10-01",

function shapeToGPS(x) {
	const arr = [x.shape_pt_lat, x.shape_pt_lon]
	return arr
}
function makePolyLineData(shapes) {
	// convert and array of shapes to array of gps for a polyline

	/*

	{
	"shape_id": "shp-10-01",
	"shape_pt_lat": "37.669974",
	"shape_pt_lon": "-122.086927",
	"shape_pt_sequence": "2",
	"shape_dist_traveled": "20.00"
  },


	var latlngs = [
	[45.51, -122.68],
	[37.77, -122.43],
	[34.04, -118.2]
];
	*/
	// sort it?
	const arr = shapes.map(shapeToGPS);
	return arr;
}


const polyLineData60 = makePolyLineData(shape60);

const polyLineData = makePolyLineData(shapesJson);

const polyLineBart = makePolyLineData(shapeBart4A);

async function getCityBoundary() {
	const file = './data/cityboundary/Land_Boundary.geojson';
	const retval = await getJson(file);
	return retval;
}


const mapFileNameToJsonData = new Map();

/*
async function getOsmGeoJsonData(dataFileName) {
	//const file = './data/osm.geojson';
	console.log("Loading data from ", dataFileName);

	if (!mapFileNameToJsonData.has(dataFileName)) {
		const data = await getJson(dataFileName);
		mapFileNameToJsonData.set(dataFileName, data);
	}
	const retval = mapFileNameToJsonData.get(dataFileName);
	return retval;
}

// changes whenever the date select changes
//var osmGeoJson = await getOsmGeoJsonData(dataFileName);

selectData.addEventListener("change", async (event) => {
	dataFileName = './data/osm' + selectData.value + 'geojson';

	osmGeoJson = await getOsmGeoJsonData(dataFileName);
});*/

//console.log("Read ", osmShopJson.elements.length);

const popupFields = [
	"rt",
	"des",
	"direction",
	"vid",
	//	"rtpidatafeed",
	"bustime",
	//"tmstmp",
	//"lat",
	//"lon",
	//	"hdg",
	//	"pid",
	//	"pdist",
	"dly",
	"spd",
	//	"tablockid",
	//	"tatripid",
	//	"zone",
	//	"mode" ,
	//	"psgld",
	//	"oid",
	//	"or",
	//	"blk",
	"tripid",
	//	"tripdyn"
	'delay',
	'data'

];
function toolTipMsg(veh) {
	const msg = '' + veh.rt;
	return msg;
}
function nodePopup(veh) {
	var msg = "";



	for (const k of popupFields) {
		const v = veh[k];
		if (!(null == v)) {
			msg += (k + ': ' + v + '<br>');
		}
	}
	if (msg == '') {
		msg = veh;
		console.log("missed popup ", msg);
	}
	return msg;
}



function createLegend() {
	const legend = L.control.Legend({
		position: "bottomleft",
		title: 'Open street map commercial land usage',
		collapsed: false,
		symbolWidth: 24,
		opacity: 0.8,
		column: 1,

		legends: [

			{
				label: "Active Commercial",
				type: "circle",
				color: w3_highway_blue,
				fillColor: w3_highway_blue
				//url: "./images/marker-highway-blue.png"
			},
			{
				label: "Vacant",
				type: "circle",
				color: w3_highway_red,
				fillColor: w3_highway_red

				//url: "./images/marker-highway-red.png",
			},
			{
				label: "Land",
				type: "circle",
				color: w3_highway_brown,
				fillColor: w3_highway_brown
				//url: "./images/marker-highway-blue.png"
			}
		]

	})
		.addTo(map);
}




// add route 60 to map

// add all bus route shaps to map

mapShapeIdToShape.forEach((v, k, unused) => {
	const coords = makePolyLineData(v);
	const polyLine = L.polyline(coords, { color: 'black' });
	polyLine.addTo(map)
});


var polyline = L.polyline(polyLineData60, { color: 'red' }).addTo(map);
//var polyline = L.polyline(polyLineData, {color: 'red'}).addTo(map);

var polyline = L.polyline(polyLineBart, { color: 'red' }).addTo(map);

if (pointerFine) { // skip the legend for the mobile case.  maybe make a smaller legend?
	//	createLegend();
}

const resizeObserver = new ResizeObserver(() => {
	//console.log("resize observer fired");
	map.invalidateSize();
});

resizeObserver.observe(document.getElementById('osm-map'));


// keep track of markers for removal
const markers = [];

function removeAllMakers() {
	for (const m of markers) {
		m.remove();
	}
}




function incrementMapKey(m, k) {
	m.set(k, m.get(k) + 1);
}

function getPointFromeature(feature) {
	const geom = feature.geometry;
	const fType = geom.type;
	var retval = null;

	if (fType == 'Point') {
		retval = geom.coordinates;
	} else if (fType == 'Polygon') {
		retval = geom.coordinates[0][0];
	} else if (fType == 'LineString') {
		retval = geom.coordinates[0][0];
	} else if (fType == 'MultiPolygon') {
		retval = geom.coordinates[0][0][0];
	}
	if (!retval) {
		console.log("no point for feature", feature)
	}
	return retval;
}


/*	if (!turf.booleanPointInPolygon(tp, downtownTurfPolygon)) {
					//console.log("Skipping item not in district ", tags)
					incrementMapKey(histShopData, arrShopKeys[2]);
					continue;
				}*/

/*
function checkGeoFilter(tp) {

	var retval = false;

	if (checkBerkeley.checked) {
		if (turf.booleanPointInPolygon(tp, berkeleyTurfPolygon)) {
			retval = true;
		}
	}
	
	if (checkDowntown.checked) {
		if (turf.booleanPointInPolygon(tp, downtownTurfPolygon)) {
			retval = true;
		}
	}
	if (checkNorthside.checked) {
		if (turf.booleanPointInPolygon(tp, northsideTurfPolygon)) {
			retval = true;
		}
	}
	if (checkFourth.checked) {
		if (turf.booleanPointInPolygon(tp, fourthTurfPolygon)) {
			retval = true;
		}
	}





	if (checkGilman.checked) {
		if (turf.booleanPointInPolygon(tp, gilmanTurfPolygon)) {
			retval = true;
		}
	}

	if (checkWestbrae.checked) {
		if (turf.booleanPointInPolygon(tp, westbraeTurfPolygon)) {
			retval = true;
		}
	}

	if (checkNorthbrae.checked) {
		if (turf.booleanPointInPolygon(tp, northbraeTurfPolygon)) {
			retval = true;
		}
	}

	if (checkSolano.checked) {
		if (turf.booleanPointInPolygon(tp, solanoTurfPolygon)) {
			retval = true;
		}
	}

	if (checkNorthshattuck.checked) {
		if (turf.booleanPointInPolygon(tp, northshattuckTurfPolygon)) {
			retval = true;
		}
	}



	if (checkUniversity.checked) {
		if (turf.booleanPointInPolygon(tp, universityTurfPolygon)) {
			retval = true;
		}
	}

	if (checkTelegraph.checked) {
		if (turf.booleanPointInPolygon(tp, telegraphTurfPolygon)) {
			retval = true;
		}
	}

	if (checkElmwood.checked) {
		if (turf.booleanPointInPolygon(tp, elmwoodTurfPolygon)) {
			retval = true;
		}
	}


	if (checkLorin.checked) {
		if (turf.booleanPointInPolygon(tp, lorinTurfPolygon)) {
			retval = true;
		}
	}
	// ADD NEW GEO FILTER
	if (checkTemescal.checked) {
		if (turf.booleanPointInPolygon(tp, temescalTurfPolygon)) {
			retval = true;
		}
	}

	// ADD NEW GEO FILTER
	if (checkValencia.checked) {
		if (turf.booleanPointInPolygon(tp, valenciaTurfPolygon)) {
			retval = true;
		}
	}

	if (checkSanpabloave.checked) {
		if (turf.booleanPointInPolygon(tp, sanpabloaveTurfPolygon)) {
			retval = true;
		}
	}

	if (checkUniversityave.checked) {
		if (turf.booleanPointInPolygon(tp, universityaveTurfPolygon)) {
			retval = true;
		}
	}

	if (checkSacramentoave.checked) {
		if (turf.booleanPointInPolygon(tp, sacramentoaveTurfPolygon)) {
			retval = true;
		}
	}
	if (checkMlkway.checked) {
		if (turf.booleanPointInPolygon(tp, mlkwayTurfPolygon)) {
			retval = true;
		}
	}



	return retval;

}

*/
var nCountVacant = 0;
var nCountShop = 0;
var nCountLand = 0;

function addMarkers(vehicles
) {
	//removeAllMakers();
	//const markersAtLocation = new Map();
	// add collisions to map
	var markerCount = 0
	var skipped = 0, plotted = 0;

	var arrMappedOsmItems = [];

	for (const veh of vehicles) {



		const lat = veh.lat
		const long = veh.lon

		if (lat && long) {
			const loc = [lat, long];
			//const tp = turf.point([long, lat]);


			var opt = getOptionsForMarker(veh);

			var marker = L.circleMarker([lat, long], opt);


			var msg = nodePopup(veh)

			const ttMsg = toolTipMsg(veh);

			marker.bindTooltip(ttMsg,
				{
					permanent: true,
					direction: 'center',
					className: 'bus-tooltip'
				}
			);


			if (pointerFine) {

				//marker.bindTooltip(msg).openTooltip();// can copy from tooltip!
				marker.bindPopup(msg).openPopup();
			} else {
				marker.bindPopup(msg).openPopup();
			}

			marker.addTo(map);
			markers.push(marker);
			markerCount++;
		} else {
			//histMissingGPSData.set(attr.Year, histMissingGPSData.get(attr.Year) + 1);
			//incrementMapKey(histMissingGPSData, attr.Year);
			//	incrementMapKey(histShopData, arrShopKeys[2]);
			skipped++;
		}
	}
	console.log('Skipped', skipped);
	console.log('Plotted', plotted);
	console.log("markerCount ", markerCount)
	/*
		const summaryMsg = '<br>Active shops: ' + nCountShop +
			'<br>Vacant: ' + nCountVacant +
			'<br>Vacant Percentage: ' + (100.0 * nCountVacant / (nCountShop + nCountVacant)).toFixed(1) + '%' +
			'<br>Land: ' + nCountLand
			+ '<br>';
		summary.innerHTML = summaryMsg;*/

	// set array for download
	const json = JSON.stringify(arrMappedOsmItems, null, 2);
	const inputblob = new Blob([json], {
		type: "application/json",
	});
	const u = URL.createObjectURL(inputblob);
	//saveanchor.href = u;

}

// chart data variables
// ADD NEW CHART
//var histShopData = new Map();  // bars Shop, Vacant
//const arrShopKeys = ['Active', 'Vacant', 'Land'];

/*
const histYearData = new Map();
const histHourData = new Map();
const arrHourKeys = [0, 3, 6, 9, 12, 15, 18, 21];

const histMissingGPSData = new Map();
var histFaultData = new Map();

var histSeverityData = new Map();
var histObjectData = new Map();


var histAgeInjuryData = new Map();  // bars 0-9, 10-19, 20-, 30, 40, 50, 60, 70, 80+
const arrAgeKeys = [0, 10, 20, 30, 40, 50, 60, 70, 80];
/
var histStopResultData = new Map();
const arrStopResultKeys = [stopArrest, stopCitation, stopWarning, stopNoAction, stopUnkown];


const arrSeverityKeys = [
	"Unspecified Injury",
	"No Injury",

	"Possible Injury",
	"Minor Injury",

	"Serious Injury",
	"Fatal"


];

const arrObjectKeys = [
	"Car", "Motorcycle", "Bicycle", "Pedestrian", "Truck", "Bus", "Parked Car", "Object", "Electric Bike", "Electric Scooter", "Electric Skateboard"
];
*/
/* histogram data */
function clearHistData(keys, data) {
	for (const f of keys) {
		data.set(f, 0);
	}
}

// ADD NEW CHART
//clearHistData(arrShopKeys, histShopData);
/*
clearHistData(arrObjectKeys, histObjectData);
clearHistData(arrSeverityKeys, histSeverityData);
clearHistData(arrAgeKeys, histAgeInjuryData);
clearHistData(arrStopResultKeys, histStopResultData);
clearHistData(arrHourKeys, histHourData);


// clear data functions
function clearHistYearData() {
	for (var y = 2015; y < 2025; y++) {
		histYearData.set(y, 0);
		histMissingGPSData.set(y, 0);
	}
}
clearHistYearData();
*/
/*
const faultKeys = [
	"Bicyclist",
	"Driver",
	"Object",
	"Other",
	"Pedestrian"
];

function clearFaultData() {
	for (const f of faultKeys) {
		histFaultData.set(f, 0);
	}
}
clearFaultData();
*/

// chart variables
// ADD NEW CHART
/*
var histShopChart;

var histYearChart;
var histHourChart;

var histChartGPS;
var histFaultChart;

var histObjectChart;
var histSeverityChart;
var histAgeInjuryChart;

var histStopResultChart;



function createOrUpdateChart(data, chartVar, element, labelText) {
	// data should be an array of objects with members bar and count
	if (chartVar == undefined) {
		chartVar = new Chart(element
			,
			{
				type: 'bar',
				data: {
					labels: data.map(row => row.bar),
					datasets: [
						{
							label: labelText,
							data: data.map(row => row.count)
						}
					]
				}
			}
		);
	} else {
		//const newData = data.map(row => row.count);
		// update data

		const newData = {
			label: labelText,
			data: data.map(row => row.count)
		}

		chartVar.data.datasets.pop();
		chartVar.data.datasets.push(newData);
		//	console.log(newData);
		chartVar.update();
	}
	return chartVar;
}
*/

function compareVehicleLists(vehiclesReal, vehiclesStatic) {
	const setTripsReal = new Set();
	const setTripsStatic = new Set();

	vehiclesReal.forEach((veh) => {
		setTripsReal.add(veh.tripid);
	});

	vehiclesStatic.forEach((veh) => {
		setTripsStatic.add(parseInt(veh.tripid));
	});

	const StaticMinusReal = setTripsStatic.difference(setTripsReal);

	const RealMinusStatic = setTripsReal.difference(setTripsStatic);
	console.log("Static Minus Real")
	for (const t of StaticMinusReal) {
		console.log(t)
	}

	console.log("Real Minus Satic")
	for (const t of RealMinusStatic) {
		console.log(t)
	}
	console.log("Diff Done")
}

async function getVehiclesACTRT() {
	const url = 'https://api.actransit.org/transit/actrealtime/vehicle/?token=' + TOKEN;
	const json = await getJson(url);
	const resp = json["bustime-response"];
	const vehicles = resp.vehicle;

	vehicles.forEach((v) => {
		v.data = 'actrt';
		const trip = mapTripIdToTrip.get(v.tripid);
		if (trip) {
			v.direction = trip.direction_id;
		} 	else {
			v.direction = 'UNKNOWN';
		}
	}
	);

	return vehicles;

}


async function handleFilterClick() {
	console.log('filter click')
	// ADD NEW CHART
	//	clearHistData(arrShopKeys, histShopData);

	/*	clearHistYearData();
		clearHistData(arrHourKeys, histHourData);
		clearFaultData();
		clearHistData(arrObjectKeys, histObjectData);
		clearHistData(arrSeverityKeys, histSeverityData);
		clearHistData(arrAgeKeys, histAgeInjuryData);
		clearHistData(arrStopResultKeys, histStopResultData);
	
		const dataSpec = selectData.value;
		var tsSet;
		var collData = shopJson;
	*/

	// reset summary counts 
	nCountVacant = 0

	nCountShop = 0
	nCountLand = 0;

getMS();
	const vehiclesReal = await getVehiclesACTRT();
getMS("act real time");
	const vehiclesStatic = getStaticVehicles();
getMS("static schedule");
/*
	const vehicles511 = await get511ActVehicles();
getMS("511")
const vehiclesgtfs = await getGTFSVehicles();
getMS("GTFS");
*/
	//compareVehicleLists(vehiclesReal, vehiclesStatic);



	const vehicles = vehiclesReal;//.concat(vehiclesStatic);//.concat(vehicles511).concat(vehiclesgtfs);

	//const vehicles =  vehicles511;// gtfsVehicles;
	removeAllMakers();
	// get delays
	/*
	for (const veh of vehicles) {
		veh.delay = await getVehicleDelay(veh.vid) + ' minutes'
	}*/

	addMarkers(vehicles);
	/*
		addMarkers(vacantJson, true,
	
			checkShop.checked,
			checkAmenity.checked,
	
			checkDisusedShop.checked,
			checkDisusedAmenity.checked,
	
			checkOtherAmenity.checked
		);*/

	// ADD NEW CHART
	/*const dataShops = [];

	for (const k of arrShopKeys) {
		dataShops.push({ bar: k, count: histShopData.get(k) })
	}*/

	/*	const dataFault = [];
		for (const k of faultKeys) {
			dataFault.push({ bar: k, count: histFaultData.get(k) })
		}
	
		const dataObject = [];
		for (const k of arrObjectKeys) {
			dataObject.push({ bar: k, count: histObjectData.get(k) })
		}
	
		const dataSeverity = [];
		for (const k of arrSeverityKeys) {
			dataSeverity.push({ bar: k, count: histSeverityData.get(k) })
		}
	
		const dataStopResult = [];
		for (const k of arrStopResultKeys) {
			dataStopResult.push({ bar: k, count: histStopResultData.get(k) })
		}
	
	*/
	// ADD NEW CHART
	//histShopChart = createOrUpdateChart(dataShops, histShopChart, document.getElementById('shopHist'),
	//'Commercial sites');

	/*	histFaultChart = createOrUpdateChart(dataFault, histFaultChart, document.getElementById('crashFaultHist'), 'Collisions by Fault');
	
		histObjectChart = createOrUpdateChart(dataObject, histObjectChart, document.getElementById('involvedObjectHist'), 'Crash Particpants');
	
		histSeverityChart = createOrUpdateChart(dataSeverity, histSeverityChart, document.getElementById('severityHist'), 'Injury Severity');
	
		const dataByYear = [];
		for (var bar = 2015; bar <= 2024; bar++) {
			dataByYear.push({ bar: bar, count: histYearData.get(bar) });
		}
	
		histYearChart = createOrUpdateChart(dataByYear, histYearChart, document.getElementById('yearHist'), 'Collisions or Stops by Year');
	
		const dataByHour = [];
		for (const k of arrHourKeys) {
			dataByHour.push({ bar: k, count: histHourData.get(k) })
		}
	
		histHourChart = createOrUpdateChart(dataByHour, histHourChart, document.getElementById('hourHist'), 'Collisions or Stops by Hour');
	
		const dataGPSByYear = [];
		for (var bar = 2015; bar <= 2024; bar++) {
			dataGPSByYear.push({ bar: bar, count: histMissingGPSData.get(bar) });
		}
	
		histChartGPS = createOrUpdateChart(dataGPSByYear, histChartGPS, document.getElementById('gpsHist'), 'Missing GPS by Year');
		//ageInjuryHist
	
		const dataInjurybyAge = [];
		for (const k of arrAgeKeys) {
			dataInjurybyAge.push({ bar: k, count: histAgeInjuryData.get(k) })
		}
	
		histAgeInjuryChart = createOrUpdateChart(dataInjurybyAge, histAgeInjuryChart, document.getElementById('ageInjuryHist'), 'Injury by Age');
	
		histStopResultChart = createOrUpdateChart(dataStopResult, histStopResultChart, document.getElementById('stopResultHist'), 'Stop Results');
	*/
}

handleFilterClick();
setInterval(handleFilterClick, 15 * 1000)

function handleExportClick() {
	handleFilterClick();
}

/*
saveanchor.addEventListener(
	"click", handleExportClick
	//	 (event) => (event.target.href = canvas.toDataURL()),
);*/


/* unused stuff

	
*/




export {
	greenIcon, goldIcon, redIcon,

	map, handleFilterClick
};