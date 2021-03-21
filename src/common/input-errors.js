// Used to prepare and write input validation errors.


// String too long.
function setStringTooLongError(errorObj, vColName, vRowIndex, vMaxLength)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be longer than " + vMaxLength + " characters.";
}


// String empty.
function setStringEmptyError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be empty.";
}


// Invalid value type.
function setInvalidTypeError(errorObj, vColName, vRowIndex, vCorrectType)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "must be a valid " + vCorrectType + ".";
}


// Number too large.
function setNumberTooLargeError(errorObj, vColName, vRowIndex, vMaxValue)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be larger than " + vMaxValue;
}


// Negative number.
function setNumberNegativeError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message + "cannot be negative.";
}


// Zero.
function setNumberZeroError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "cannot be zero.";
}


// Invalid date.
function setDateFormatError(errorObj, vColName, vRowIndex)
{
	errorObj.rowNumber = vRowIndex;
	errorObj.column = vColName;
	errorObj.message = "is not a valid date.";
}


// Writes full error text after it has been prepared.
function writeFullMessageText(errorObj)
{
	var writeRes = "";
	
	writeRes += addErrorField("Column", errorObj.column);
	writeRes += addErrorField("Message", errorObj.message);
	writeRes += addErrorField("Row Number", errorObj.rowNumber);
	
	return writeRes;
}


// Adds field to error text, line-separated.
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