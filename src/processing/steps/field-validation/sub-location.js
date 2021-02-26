const valuePrep = require("../../../common/value-prep");
const inputErrors = require("../../../common/input-errors");


function validateSubLocation(rowInd, rowObj, colName, maxLengthNum, arrayName, parentLocationID, fullResObj, entryRequired)
{
	var givenValue = rowObj[colName];
	var correctType = valuePrep.checkString(givenValue);
	var validationResult = -1;
	
	if (correctType === true && givenValue.length > 0 && givenValue.length <= maxLengthNum)
	{
		validationResult = addLocation(givenValue, arrayName, parentLocationID, fullResObj);
	}
	else if (correctType === true && givenValue.length > maxLengthNum)
	{
		inputErrors.setStringTooLong(fullResObj.error, colName, rowInd, maxLengthNum);
	}
	else if (correctType === true && entryRequired === true)
	{
		inputErrors.setStringEmpty(fullResObj.error, colName, rowInd);
	}
	else if (correctType === true)
	{
		validationResult = addLocation("", arrayName, parentLocationID, fullResObj);
	}
	else
	{
		inputErrors.setInvalidType(fullResObj.error, colName, rowInd, "string");
	}
	
	return validationResult;
}


function addLocation(locationString, arrName, targetParentID, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(locationString);
	
	var existingIndex = 0;
	var currentLocationObject = {};
	var currentLocationName = "";
	var currentParentID = -1;
	var existFlag = -1;
	
	var addRes = -1;
	var newLocationObject = {};
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existFlag === -1)
	{
		currentLocationObject = arrObj[existingIndex];
		currentLocationName = currentLocationObject.name;
		currentParentID = currentLocationObject.parentLocation;
		
		if (currentLocationName.toLowerCase() === preparedItem.toLowerCase() && currentParentID === targetParentID)
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existFlag >= 0 && existFlag < arrObj.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		newLocationObject = {"name": preparedItem, "parentLocation": targetParentID};
		arrObj.push(newLocationObject);
		addRes = arrObj.length;
	}
	
	return addRes;
}



module.exports =
{
	validateLocation: validateSubLocation
};