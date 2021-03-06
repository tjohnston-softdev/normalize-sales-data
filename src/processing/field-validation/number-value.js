const valuePrep = require("../../common/value-prep");
const inputErrors = require("../../common/input-errors");


function validateDecimalNumber(rowInd, rowObj, colName, maxDecimal, defaultDecimal, zeroNumAllowed, fullResObj)
{
	var writtenString = rowObj[colName];
	var preparedValue = castNumberString(writtenString);
	var numType = Number.isFinite(preparedValue);
	
	var validationResult = checkNumber(preparedValue, rowInd, colName, maxDecimal, defaultDecimal, numType, "number", zeroNumAllowed, fullResObj);
	return validationResult;
}


function validateWholeNumber(rowInd, rowObj, colName, maxWhole, defaultWhole, zeroNumAllowed, fullResObj)
{
	var writtenString = rowObj[colName];
	var preparedValue = castNumberString(writtenString);
	var numType = Number.isInteger(preparedValue);
	
	var validationResult = checkNumber(preparedValue, rowInd, colName, maxWhole, defaultWhole, numType, "whole number", zeroNumAllowed, fullResObj);
	return validationResult;
}


function castNumberString(origStr)
{
	var stringType = valuePrep.checkString(origStr);
	var preparedString = "";
	var castRes = NaN;
	
	if (stringType === true)
	{
		preparedString = valuePrep.sanitizeString(origStr);
	}
	
	if (preparedString.length > 0)
	{
		castRes = Number(preparedString);
	}
	
	return castRes;
}



function checkNumber(nValue, nRowIndex, nColName, nMaximum, nDefault, typeState, typeString, allowZero, fullRes)
{
	var defaultGiven = Number.isFinite(nDefault);
	var checkRes = NaN;
	
	if (typeState === true && nValue > 0 && nValue <= nMaximum)
	{
		checkRes = nValue;
	}
	else if (typeState === true && nValue > nMaximum)
	{
		inputErrors.setNumberTooLarge(fullRes.error, nColName, nRowIndex, nMaximum);
	}
	else if (typeState === true && nValue === 0 && allowZero === true)
	{
		checkRes = 0;
	}
	else if (typeState === true && nValue === 0)
	{
		inputErrors.setNumberZero(fullRes.error, nColName, nRowIndex);
	}
	else if (typeState === true)
	{
		inputErrors.setNumberNegative(fullRes.error, nColName, nRowIndex);
	}
	else if (defaultGiven === true)
	{
		checkRes = nDefault;
	}
	else
	{
		inputErrors.setInvalidType(fullRes.error, nColName, nRowIndex, typeString);
	}
	
	return checkRes;
}




module.exports =
{
	validateDecimal: validateDecimalNumber,
	validateWhole: validateWholeNumber
};