const valuePrep = require("../../../common/value-prep");
const inputErrors = require("../../../common/input-errors");


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


function checkType(sValue, sRowIndex, sColName, fullRes)
{
	var checkRes = valuePrep.checkString(sValue);
	
	if (checkRes !== true)
	{
		inputErrors.setInvalidType(fullRes.error, sColName, sRowIndex, "string");
	}
	
	return checkRes;
}


function checkLength(sLength, sRowIndex, sColName, maxLength, entryReq, fullRes)
{
	var checkRes = false;
	
	if (sLength > 0 && sLength <= maxLength)
	{
		checkRes = true;
	}
	else if (sLength > maxLength)
	{
		inputErrors.setStringTooLong(fullRes.error, sColName, sRowIndex, maxLengthNum);
	}
	else if (entryReq === true)
	{
		inputErrors.setStringEmpty(fullRes.error, sColName, sRowIndex);
	}
	else
	{
		checkRes = true;
	}
	
	return checkRes;
}


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