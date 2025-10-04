/*
async function getZipJson(url) {
	try {
		const response = await fetch(url); // {cache: 'no-cache'} https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const bytes = await response.bytes();
		const inflate = new pako.Inflate({ level: 3 });
		inflate.push(bytes, true);  // true -> last chunk

		if (inflate.err) { throw new Error(inflate.err); }

		console.log(inflate.result);
		const decompressedbuffer = inflate.result;
		const utf8decoder = new TextDecoder("utf-8");
		const str = utf8decoder.decode(decompressedbuffer);
		const json = JSON.parse( str);
		return json;
	} catch (error) {
		console.error(error.message);
	}
}
*/
var lastTime = 0;
function getMS(msg) {
	const thisTime = Date.now();
	const diff = thisTime - lastTime;
	lastTime = thisTime;

	if (msg) {
		console.log(msg, ':', diff, ' ms')
	}
	return diff;
}

async function getJson(url) {
	try {
		const response = await fetch(url); // {cache: 'no-cache'} https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error.message);
	}
}



/* called once for each csv line */

function stepper(results, accumulator, filter, transform) {
	const errs = results.errors
	if (errs && errs.length > 0) {

		console.log("Stepper Errors:", errs) // log id fields?
		return;
	}
	var row = results.data;

	if (filter) {
		if (!filter(row)) {
			return false;
		}
	}

	if (transform) {
		const transformed = transform(results.data)
		accumulator.push(transformed)
	} else {
		accumulator.push(results.data);
	}

	return;
}
/* example filter */
/* filter called once after parsing, returns t/f 
const constBerkeley = 'Berkeley'

function filterBerkeley(obj) {
	const city = obj['City Name'];
	if (!city || city != constBerkeley) {
		return false
	}
	return true
}
*/
/* optionally modify / replace parsed obj 
function transformCrash(obj) {
	var attrObj = {};
	if (obj) {
		attrObj.CollisionId = obj['Collision Id'];
		attrObj.Case_ID = obj['Collision Id'];
		attrObj.Primary_Collision_Factor_Code = obj["Primary Collision Factor Violation"]

		attrObj.Local_Report_Number = obj['Report Number']; // this would be the BPD transparency portal id
		attrObj.CityName = obj['City Name'];
		attrObj.CCRSDateTime = obj['Crash Date Time'];
		attrObj.NumberInjured = obj.NumberInjured
		attrObj.NumberKilled = obj.NumberKilled
		attrObj.PrimaryRoad = obj.PrimaryRoad
		attrObj.SecondaryRoad = obj.SecondaryRoad
		if (obj.SecondaryDistance) {
			attrObj.Accident_Location_Offset = '' + obj.SecondaryDistance +
				' ' + (obj.SecondaryUnitOfMeasure ?? 'F') +
				' ' + obj.SecondaryDirection;
		} else {
			attrObj.Accident_Location_Offset = ''
		}
		attrObj.Latitude = obj.Latitude
		attrObj.Longitude = obj.Longitude
	}
	var retObj = { attributes: attrObj };

	//retObj.attributes = obj;
	return retObj;
}
*/

/*
async function readCsv(fileURL, accumlator, filter, transform) {
	console.log("Parsing ", fileURL)
	const papaPromise = (importFile) => new Promise((resolve, reject) => {
		var bSuccess = true;

		Papa.parse(importFile, {
			header: true,
			dynamicTyping: true,
			download: true,
			skipEmptyLines: true,
			skipEmptyLines: false,
			//	fastMode: true,

			step: function (results, parser) {
				stepper(results, accumlator, filter, transform)
				//console.log("Row data:", results.data);
				//console.log("Row errors:", results.errors);
			},
			complete: function (results) {
				resolve(results);
			},
			error: function (error) {
				console.log("Error:", error)
				bSuccess = false;
				reject(error);
			}
		});
	})

	const results = await papaPromise(fileURL);
	return results.data;
}

async function getCSV(url) {
	var rows = [];
	await readCsv(url, rows);
	return rows;

}
*/
/* example csv usage
var rowsCrashes = [];
//await readCsv('./build/ccrsToJson/testcrashes.csv', rowsCrashes, filterBerkeley, transformCrash)

await readCsv(crashFileName, rowsCrashes, filterBerkeley, transformCrash)
console.log("Crashes:", rowsCrashes.length)
*/



export { getJson, /*getCSV, getZipJson,*/ getMS };
