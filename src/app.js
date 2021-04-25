const express = require( "express" );
const path = require( "path" );
const hbs = require( "hbs" );

const geocode = require( "./usecase/geocode" );
const forecast = require( "./usecase/forecast" );

const app = express();

// Define paths for express configuration
const publicDirectoryPath = path.join( __dirname, "../public" );
const viewsPath = path.join( __dirname, "../templates/views" );
const partielsPath = path.join( __dirname, "../templates/partiels" );

// Setup handelbars engine and views location
app.set( "view engine", "hbs" );
app.set( "views", viewsPath );
hbs.registerPartials( partielsPath );

// Setup static directory to serve
app.use( express.static( publicDirectoryPath ) );

app.get( "", ( request, response ) => {
	response.render( "index", {
		title: "Weather app",
		name: "handelbars"
	});
});

app.get( "/about", ( resquest, response ) => {
	response.send( "<h1>About page</h1>" );
});

app.get( "/about/*", ( resquest, response ) => {
	response.send( "<h1>About page not found..</h1>" );
});

app.get( "/weather", ( request, response ) => {
	const value = request.query.address;

	if( value === undefined )
		return response.send( {
			message: "error provide an correct address"
		});

	geocode( value, ( error, results ) => {
		if( error !== undefined )
			return response.send({
				message: error
			});

		forecast( results[ 0 ].Latitude, results[ 0 ].Longitude, ( error, result ) => {
			if( error !== undefined )
				return response.send({
					message: error
				});

			const value = `${result.Description}. It is currently ${result.Temperature} ` +
			`degrees out, There is ${result.Precipitation}% chance of rain.`;

			/* response.render( "weather", {
				location: results[ 0 ].Location,
				forecast: value
			}); */

			response.send({
				location: results[ 0 ].Location,
				forecast: value
			});
		});
	});
});

app.get( "*", ( request, response ) => {
	response.send( "404 page" );
});

app.listen( 3000, () => {
	console.log( "Server is up on port 3000" );
});