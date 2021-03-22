// Validate date string value.

const valuePrep = require("../../common/value-prep");
const inputErrors = require("../../common/input-errors");


// Main function.
function validateDateText(rowInd, rowObj, colName, fullResObj)
{
	var writtenString = rowObj[colName];
	var preparedValue = prepareDateString(writtenString);
	var lengthValid = checkDateStringLength(rowInd, colName, preparedValue.length, fullResObj);
	var validationResult = {"dateObject": null, "valid": false};
	
	if (lengthValid === true)
	{
		checkDateFormat(rowInd, colName, preparedValue, validationResult, fullResObj);
	}
	
	return validationResult;
}


// Check for string type.
function prepareDateString(origStr)
{
	var stringType = valuePrep.checkString(origStr);
	var prepRes = "";
	
	if (stringType === true)
	{
		prepRes = valuePrep.sanitizeString(origStr);
	}
	
	return prepRes;
}


// Check for non-empty length.
function checkDateStringLength(dRowIndex, dColName, dLength, fullRes)
{
	var checkRes = false;
	
	if (dLength > 0)
	{
		checkRes = true;
	}
	else
	{
		inputErrors.setStringEmpty(fullRes.error, dColName, dRowIndex);
	}
	
	return checkRes;
}


// Check valid format.
function checkDateFormat(dRowIndex, dColName, dString, validRes, fullRes)
{
	var castDateObject = new Date(dString);
	var numericValue = castDateObject.valueOf();
	var castValid = Number.isInteger(numericValue);
	
	if (castValid === true)
	{
		// Valid format.
		validRes.dateObject = castDateObject;
		validRes.valid = true;
	}
	else
	{
		// Invalid format.
		inputErrors.setDateFormat(fullRes.error, dColName, dRowIndex);
	}
}



module.exports =
{
	validateDate: validateDateText
};