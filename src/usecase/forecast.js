const request = require( "request" );

function forecast( latitude, longitude, callback ) {
	const url =
		"http://api.weatherstack.com/current?access_key=37f032773302ee8a7be25f50f5977b9b&query=" +
		latitude + "," + longitude +
		"&units=m";

	request( { url: url, json: true }, ( error, response ) => {
		if( error !== null ) {
			callback( "Unable to connect to weather service...", undefined );
			return;
		}

		const raw = response.body;

		if( raw.error !== undefined ) {
			callback( raw.error.info, undefined );
			return;
		}

		const result = {
			Description: raw.current.weather_descriptions[0],
			Temperature: raw.current.temperature,
			Precipitation : raw.current.precip
		}

		callback( undefined, result );
	});
}

module.exports = forecast;
