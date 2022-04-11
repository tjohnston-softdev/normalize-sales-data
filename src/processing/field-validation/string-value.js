// Validate string value.

const valuePrep = require("../../common/value-prep");
const inputErrors = require("../../common/input-errors");


// Main function.
function validateStringText(rowInd, rowObj, colName, maxLengthNum, entryRequired, fullResObj)
{
	var givenValue = rowObj[colName];
	var validationResult = defineStringValidationResult();
	var correctType = checkType(givenValue, rowInd, colName, fullResObj);
	
	if (correctType)
	{
		validationResult.preparedText = valuePrep.sanitizeString(givenValue);
		validationResult.valid = checkLength(validationResult.preparedText.length, rowInd, colName, maxLengthNum, fullResObj);
	}
	
	return validationResult;
}


// Check for string type.
function checkType(strValue, strRowInd, strColName, fullRes)
{
	var checkRes = valuePrep.checkString(strValue);
	if (!checkRes !== true) inputErrors.setInvalidType(fullRes.error, strColName, strRowInd, "string");
	return checkRes;
}


// Check for safe length.
function checkLength(strLength, strRowIndex, strColName, maxLength, entryReq, fullRes)
{
	var checkRes = false;
	
	if (strLength > 0 && strLength <= maxLength)
	{
		// Valid.
		checkRes = true;
	}
	else if (strLength > maxLength)
	{
		// Too long.
		inputErrors.setStringTooLong(fullRes.error, strColName, strRowIndex, maxLengthNum);
	}
	else if (entryReq === true)
	{
		// Empty.
		inputErrors.setStringEmpty(fullRes.error, strColName, strRowIndex);
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
	return {preparedText: "", valid: false};
}



module.exports =
{
	validateString: validateStringText
};