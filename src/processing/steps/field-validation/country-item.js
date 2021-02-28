const valuePrep = require("../../../common/value-prep");

function addCountryItem(countryString, countryArr, terrID)
{
	var preparedItem = valuePrep.sanitizeString(countryString);
	
	var existingIndex = 0;
	var currentCountryObject = {};
	var currentCountryString = "";
	var existFlag = -1;
	
	var addRes = -1;
	var newCountryObject = {};
	
	while (existingIndex >= 0 && existingIndex < countryArr.length && existFlag === -1)
	{
		currentCountryObject = countryArr[existingIndex];
		currentCountryString = currentCountryObject.name;
		
		if (currentCountryString.toLowerCase() === preparedItem.toLowerCase())
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	
	if (existFlag >= 0 && existFlag < countryArr.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		newCountryObject = {"name": preparedItem, "territory": terrID};
		countryArr.push(newCountryObject);
		addRes = countryArr.length;
	}
	
	return addRes;
}



module.exports =
{
	addCountry: addCountryItem
};