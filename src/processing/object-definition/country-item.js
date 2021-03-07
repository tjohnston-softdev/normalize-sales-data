const valuePrep = require("../../common/value-prep");

function addCountryItem(countryString, countryArr, terrID)
{
	var preparedItem = valuePrep.sanitizeString(countryString);
	
	var existingIndex = 0;
	var currentCountryObject = {};
	var currentCountryString = "";
	var existID = null;
	
	var addRes = -1;
	var newCountryObject = {};
	
	while (existingIndex >= 0 && existingIndex < countryArr.length && existID === null)
	{
		currentCountryObject = countryArr[existingIndex];
		currentCountryString = currentCountryObject.name;
		
		if (currentCountryString.toLowerCase() === preparedItem.toLowerCase())
		{
			existID = currentCountryObject.countryNumber;
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
		newCountryObject = {};
		
		newCountryObject["countryNumber"] = String(addRes);
		newCountryObject["name"] = preparedItem;
		newCountryObject["territory"] = String(terrID);
		
		countryArr.push(newCountryObject);
	}
	
	return addRes;
}



module.exports =
{
	addCountry: addCountryItem
};