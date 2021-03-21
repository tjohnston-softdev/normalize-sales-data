/*
	Writes CSV parsing error.
	Used by the 'papaparse' library.
	Highest priority error will be used.
*/

function writeSpecificParseError(errList)
{
	var errorObject = errList[0];
	var rowNum = errorObject.row + 1;
	var writeRes = "";
	
	writeRes += "Error parsing input CSV.\n";
	writeRes += errorObject.message;
	writeRes += "\n";
	writeRes += "Row Number: ";
	writeRes += rowNum;
	
	return writeRes;
}


module.exports =
{
	writeSpecificParse: writeSpecificParseError
};