const valueLimits = require("../../../common/value-limits");
const valuePrep = require("../../../common/value-prep");
const inputErrors = require("../../../common/input-errors");


function validateCurrencyValue(rowInd, rowObj, colName, fullResObj)
{
	var givenValue = rowObj[colName];
	var castNumber = castNumberString(givenValue);
	var validNumber = Number.isFinite(castNumber);
	var validationResult = NaN;
	
	
	if (validNumber === true && castNumber >= 0 && castNumber <= valueLimits.currency)
	{
		validationResult = castNumber;
	}
	else if (validNumber === true && castNumber > valueLimits.currency)
	{
		
	}
}


function castNumberString(sValue)
{
	var stringWritten = valuePrep.checkString(sValue);
	var preparedString = "";
	var castRes = NaN;
	
	if (stringWritten === true)
	{
		preparedString = valuePrep.sanitizeString(sValue);
		castRes = Number(preparedString);
	}
	
	return castRes;
}