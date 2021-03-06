function setStringTooLongError(errorObj, vColName, vRowIndex, vMaxLength)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be longer than " + vMaxLength + " characters.";
}


function setStringEmptyError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be empty.";
}


function setInvalidTypeError(errorObj, vColName, vRowIndex, vCorrectType)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "must be a valid " + vCorrectType + ".";
}


function setNumberTooLargeError(errorObj, vColName, vRowIndex, vMaxValue)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be larger than " + vMaxValue;
}


function setNumberNegativeError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message + "cannot be negative.";
}


function setNumberZeroError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be zero.";
}


function setDateFormatError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "is not a valid date.";
}


function writeFullMessageText(errorObj)
{
	var writeRes = "";
	
	writeRes += addErrorField("Column", errorObj.column);
	writeRes += addErrorField("Message", errorObj.message);
	writeRes += addErrorField("Row Number", errorObj.rowNumber);
	
	return writeRes;
}


function addErrorField(fieldName, fieldVal)
{
	var addedText = fieldName + ": " + fieldVal + "\n";
	return addedText;
}



module.exports =
{
	setStringTooLong: setStringTooLongError,
	setStringEmpty: setStringEmptyError,
	setInvalidType: setInvalidTypeError,
	setNumberTooLarge: setNumberTooLargeError,
	setNumberNegative: setNumberNegativeError,
	setNumberZero: setNumberZeroError,
	setDateFormat: setDateFormatError,
	writeFullMessage: writeFullMessageText
};