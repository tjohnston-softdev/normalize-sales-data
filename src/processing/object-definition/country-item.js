/*
	Adds or retrieves country items.
	[id, name, territory]
*/

const valuePrep = require("../../common/value-prep");


function addCountryItem(countryString, countryArr, terrID)
{
	var preparedItem = "";
	
	var existingIndex = 0;
	var currentCountryObject = [];
	var currentCountryString = "";
	var existID = null;
	
	var addRes = -1;
	var newCountryObject = [];
	
	// Prepares target name.
	preparedItem = valuePrep.sanitizeString(countryString);
	
	
	// Loop existing country objects until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < countryArr.length && existID === null)
	{
		// Read current country.
		currentCountryObject = countryArr[existingIndex];
		currentCountryString = currentCountryObject[1];
		
		if (currentCountryString.toLowerCase() === preparedItem.toLowerCase())
		{
			// Match found.
			existID = currentCountryObject[0];
		}
		
		existingIndex = existingIndex + 1;
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