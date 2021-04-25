const request = require( "request" );

function geocode( address, callback ) {
	const geocodeUrl =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent( address ) +
		".json?access_token=pk.eyJ1IjoiOTllbG1laGRpIiwiYSI6ImNrbmx6czBvZTBteGEycW1wNXQyeHdmdGIifQ.-Vb3MhC3DbxB_t8GB4Jx5A";

	request( { url: geocodeUrl, json: true }, ( error, response ) => {
		if( error !== null ) {
			callback( "Unable to connect to geocoding service...", undefined );
			return;
		}

		const raw = response.body;

		if( raw.features === undefined || raw.features.length === 0 ) {
			callback( "No result found...", undefined );
			return;
		}

		const results = [];

		raw.features.forEach( result => {
			results.push({
				Location: result.place_name,
				Latitude: result.center[1],
				Longitude: result.center[0]
			});
		});

		callback( undefined, results );
	});
}

function process( results ) {
	results.forEach( ( result, index ) => {
		console.log(
			`Place ${index}: ${result.Location} - Latitude: ${result.Latitude}, Longitude: ${result.Longitude}`
		);
	})
}

module.exports = geocode;
