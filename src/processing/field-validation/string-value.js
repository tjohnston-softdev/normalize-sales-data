// Validate string value.

const valuePrep = require("../../common/value-prep");
const inputErrors = require("../../common/input-errors");


// Main function.
function validateStringText(rowInd, rowObj, colName, maxLengthNum, entryRequired, fullResObj)
{
	var givenValue = rowObj[colName];
	var validationResult = defineStringValidationResult();
	var correctType = checkType(givenValue, rowInd, colName, fullResObj);
	
	if (correctType === true)
	{
		validationResult.preparedText = valuePrep.sanitizeString(givenValue);
		validationResult.valid = checkLength(validationResult.preparedText.length, rowInd, colName, maxLengthNum, fullResObj);
	}
	
	return validationResult;
}


// Check for string type.
function checkType(sValue, sRowIndex, sColName, fullRes)
{
	var checkRes = valuePrep.checkString(sValue);
	
	if (checkRes !== true)
	{
		// Invalid.
		inputErrors.setInvalidType(fullRes.error, sColName, sRowIndex, "string");
	}
	
	return checkRes;
}


// Check for safe length.
function checkLength(sLength, sRowIndex, sColName, maxLength, entryReq, fullRes)
{
	var checkRes = false;
	
	if (sLength > 0 && sLength <= maxLength)
	{
		// Valid.
		checkRes = true;
	}
	else if (sLength > maxLength)
	{
		// Too long.
		inputErrors.setStringTooLong(fullRes.error, sColName, sRowIndex, maxLengthNum);
	}
	else if (entryReq === true)
	{
		// Empty.
		inputErrors.setStringEmpty(fullRes.error, sColName, sRowIndex);
	}
	else
	{
		// Optional.
		checkRes = true;
	}
	
	return checkRes;
}


// String validation result object.
function defineStringValidationResult()
{
	var defineRes = {};
	
	defineRes["preparedText"] = "";
	defineRes["valid"] = false;
	
	return defineRes;
}



module.exports =
{
	validateString: validateStringText
};