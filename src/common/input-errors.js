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
	writeFullMessage: writeFullMessageText
};