const valuePrep = require("../../../common/value-prep");
const inputErrors = require("../../../common/input-errors");


function validateListItem(rowInd, rowObj, colName, maxLengthNum, arrayName, fullResObj)
{
	var givenValue = rowObj[colName];
	var correctType = valuePrep.checkString(givenValue);
	var validationResult = -1;
	
	if (correctType === true && givenValue.length > 0 && givenValue.length <= maxLengthNum)
	{
		validationResult = addItem(givenValue, arrayName, fullResObj);
	}
	else if (correctType === true && givenValue.length > maxLengthNum)
	{
		inputErrors.setStringTooLong(fullResObj.error, colName, rowInd, maxLengthNum);
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


function addItem(itemString, arrName, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(itemString);
	
	var existingIndex = 0;
	var currentExistingItem = "";
	var existFlag = -1;
	
	var addRes = -1;
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existFlag === -1)
	{
		currentExistingItem = arrObj[existingIndex];
		
		if (currentExistingItem.toLowerCase() === preparedItem.toLowerCase())
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
		arrObj.push(preparedItem);
		addRes = arrObj.length;
	}
	
	return addRes;
}



module.exports =
{
	validateItem: validateListItem
};