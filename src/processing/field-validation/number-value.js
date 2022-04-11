// Validate number values.

const valuePrep = require("../../common/value-prep");
const inputErrors = require("../../common/input-errors");


// Main - Decimal.
function validateDecimalNumber(rowInd, rowObj, colName, maxDecimal, defaultDecimal, zeroNumAllowed, fullResObj)
{
	var writtenString = rowObj[colName];
	var preparedValue = castNumberString(writtenString);
	var numType = Number.isFinite(preparedValue);
	
	var validationResult = checkNumber(preparedValue, rowInd, colName, maxDecimal, defaultDecimal, numType, "number", zeroNumAllowed, fullResObj);
	return validationResult;
}


// Main - Whole.
function validateWholeNumber(rowInd, rowObj, colName, maxWhole, defaultWhole, zeroNumAllowed, fullResObj)
{
	var writtenString = rowObj[colName];
	var preparedValue = castNumberString(writtenString);
	var numType = Number.isInteger(preparedValue);
	
	var validationResult = checkNumber(preparedValue, rowInd, colName, maxWhole, defaultWhole, numType, "whole number", zeroNumAllowed, fullResObj);
	return validationResult;
}


// Converts string to number.
function castNumberString(origStr)
{
	var stringType = valuePrep.checkString(origStr);
	var preparedString = "";
	var castRes = NaN;
	
	if (stringType) preparedString = valuePrep.sanitizeString(origStr);		// Correct type - Sanitize input.
	if (preparedString.length > 0) castRes = Number(preparedString);		// Cast to number.
	return castRes;
}


// Check number value.
function checkNumber(nValue, nRowIndex, nColName, nMaximum, nDefault, typeState, typeString, allowZero, fullRes)
{
	var defaultGiven = Number.isFinite(nDefault);
	var checkRes = NaN;
	
	if (typeState && nValue > 0 && nValue <= nMaximum)
	{
		// Valid.
		checkRes = nValue;
	}
	else if (typeState && nValue > nMaximum)
	{
		// Too large.
		inputErrors.setNumberTooLarge(fullRes.error, nColName, nRowIndex, nMaximum);
	}
	else if (typeState && nValue === 0 && allowZero)
	{
		// Zero allowed.
		checkRes = 0;
	}
	else if (typeState && nValue === 0)
	{
		// Zero not allowed.
		inputErrors.setNumberZero(fullRes.error, nColName, nRowIndex);
	}
	else if (typeState)
	{
		// Negative not allowed.
		inputErrors.setNumberNegative(fullRes.error, nColName, nRowIndex);
	}
	else if (defaultGiven)
	{
		// Use default.
		checkRes = nDefault;
	}
	else
	{
		// Invalid type.
		inputErrors.setInvalidType(fullRes.error, nColName, nRowIndex, typeString);
	}
	
	return checkRes;
}




module.exports =
{
	validateDecimal: validateDecimalNumber,
	validateWhole: validateWholeNumber
};