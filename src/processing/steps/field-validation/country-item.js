const valueLimits = require("../../../common/value-limits");
const valuePrep = require("../../../common/value-prep");
const inputErrors = require("../../../common/input-errors");
const colName = "COUNTRY";

function validateCountryItem(rowInd, rowObj, territoryID, fullResObj)
{
	var givenValue = rowObj[colName];
	var correctType = valuePrep.checkString(givenValue);
	var validationResult = -1;
	
	if (correctType === true && givenValue.length > 0 && givenValue.length <= valueLimits.country)
	{
		validationResult = addCounry(givenValue, fullResObj.data.countries, territoryID);
	}
	else if (correctType === true && givenValue.length > valueLimits.country)
	{
		inputErrors.setStringTooLong(fullResObj.error, colName, rowInd, valueLimits.country);
	}
	else if (correctType === true)
	{
		inputErrors.setStringEmpty(fullResObj.error, colName, rowInd);
	}
	else
	{
		inputErrors.setInvalidType(fullResObj.error, colName, rowInd, "string");
	}
	
	return validationResult;
}



function addCounry(countryString, countryArr, terrID)
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
	validateCountry: validateCountryItem
};