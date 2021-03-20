const valuePrep = require("../../common/value-prep");

function addCountryItem(countryString, countryArr, terrID)
{
	var preparedItem = valuePrep.sanitizeString(countryString);
	
	var existingIndex = 0;
	var currentCountryObject = [];
	var currentCountryString = "";
	var existID = null;
	
	var addRes = -1;
	var newCountryObject = [];
	
	while (existingIndex >= 0 && existingIndex < countryArr.length && existID === null)
	{
		currentCountryObject = countryArr[existingIndex];
		currentCountryString = currentCountryObject[1];
		
		if (currentCountryString.toLowerCase() === preparedItem.toLowerCase())
		{
			existID = currentCountryObject[0];
		}
		
		existingIndex = existingIndex + 1;
	}
	
	
	if (existID !== null)
	{
		addRes = Number(existID);
	}
	else
	{
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