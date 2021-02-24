function writeGenericParseError()
{
	var writeRes = "Could not successfully parse input CSV.";
	return writeRes;
}


function writeSpecificParseError(errList)
{
	var errorObject = errList[0];
	var writeRes = "";
	
	writeRes += "Error parsing input CSV.\n";
	writeRes += errorObject.message;
	writeRes += "\n";
	writeRes += "Line index: ";
	writeRes += errorObject.row;
	
	return writeRes;
}


module.exports =
{
	writeGenericParse: writeGenericParseError,
	writeSpecificParse: writeSpecificParseError
};