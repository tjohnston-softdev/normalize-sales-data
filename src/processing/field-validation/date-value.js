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
	
	if (lengthValid) checkDateFormat(rowInd, colName, preparedValue, validationResult, fullResObj);
	return validationResult;
}


// Check for string type.
function prepareDateString(origStr)
{
	var stringType = valuePrep.checkString(origStr);
	var prepRes = "";
	
	if (stringType) prepRes = valuePrep.sanitizeString(origStr);
	return prepRes;
}


// Check for non-empty length.
function checkDateStringLength(dateRowInd, dateColName, dateColLength, fullRes)
{
	var checkRes = (dateColLength > 0);
	if (!checkRes) inputErrors.setStringEmpty(fullRes.error, dateColName, dateRowInd);
	return checkRes;
}


// Check valid format.
function checkDateFormat(dateRowInd, dateColName, dateString, validRes, fullRes)
{
	var castDateObject = new Date(dateString);
	var numericValue = castDateObject.valueOf();
	var castValid = Number.isInteger(numericValue);
	
	if (castValid)
	{
		// Valid format.
		validRes.dateObject = castDateObject;
		validRes.valid = true;
	}
	else
	{
		// Invalid format.
		inputErrors.setDateFormat(fullRes.error, dateColName, dateRowInd);
	}
}



module.exports =
{
	validateDate: validateDateText
};