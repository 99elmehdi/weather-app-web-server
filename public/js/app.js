console.log( "loading javascript file..." );

const formRef = document.querySelector( "form" );
const inputRef = document.querySelector( "input" );

const errorRef = document.getElementById( "error" );
const resultRef = document.getElementById( "result" );

async function get( value ) {
	const response = await fetch( `/weather?address=${value}` );

	const result = await response.json();

	return result;
}

async function print( value ) {
	const response = await get( value );

	if( response.message !== undefined ) {
		errorRef.textContent = response.message;
		return;
	}

	const locationRef = document.createElement( "p" );
	const forecastRef = document.createElement( "p" );

	locationRef.textContent = response.location;
	forecastRef.textContent = response.forecast;

	resultRef.append( locationRef, forecastRef );

	inputRef.value = "";
}

formRef.addEventListener( "submit", e => {
	e.preventDefault();

	const value = inputRef.value;

	print( value );
});