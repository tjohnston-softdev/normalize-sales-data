/*
	Adds or retrieves country items.
	[id, name, territory]
*/

const valuePrep = require("../../common/value-prep");


function addCountryItem(countryString, countryArr, terrID)
{
	// Prepares target name.
	var preparedItem = valuePrep.sanitizeString(countryString);
	
	// Loop variables.
	var existingIndex = 0;
	var existID = null;
	
	// Result variables.
	var addRes = -1;
	var newCountryObject = [];
	
	
	// Loop existing country objects until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < countryArr.length && existID === null)
	{
		// Read current country.
		var currentCountryObject = countryArr[existingIndex];
		var currentCountryString = currentCountryObject[1].toLowerCase();
		
		// Check for match.
		if (preparedItem.toLowerCase() === currentCountryString) existID = currentCountryObject[0];
		existingIndex += 1;
	}
	
	
	if (existID !== null)
	{
		// Use existing country.
		addRes = Number(existID);
	}
	else
	{
		// Create new country object.
		addRes = countryArr.length + 1;
		newCountryObject = [];
		
		newCountryObject[0] = String(addRes);
		newCountryObject[1] = preparedItem;
		newCountryObject[2] = String(terrID);
		
		countryArr.push(newCountryObject);
	}
	
	return addRes;
}



module.exports =
{
	addCountry: addCountryItem
};