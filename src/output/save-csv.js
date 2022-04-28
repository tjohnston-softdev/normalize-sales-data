// Used to save CSV files.

const fs = require("fs");
const papaparse = require("papaparse-min");
const valuePrep = require("../common/value-prep");
const fsErrors = require("../common/fs-errors");


// Main function.
function saveCsvFile(objectArray, fileSpecs, saveCallback)
{
	var csvTextString = convertJsonToCsv(objectArray, fileSpecs.tableAttributes);
	var conversionSuccessful = valuePrep.checkString(csvTextString);
	
	if (conversionSuccessful)
	{
		handleFileWrite(fileSpecs.filePath, csvTextString, fileSpecs.tableName, saveCallback);
	}
}


// Save CSV file.
function handleFileWrite(csvPath, csvContents, csvDesc, handleCallback)
{	
	fs.writeFile(csvPath, csvContents, function (writeErr)
	{
		if (writeErr !== null)
		{
			var flaggedMessage = fsErrors.writeFileAction("writing", csvDesc, csvPath, writeErr.code);
			return handleCallback(new Error(flaggedMessage), null);
		}
		else
		{
			return handleCallback(null, true);
		}
	});
}


// Converts JSON array to CSV string.
function convertJsonToCsv(objArr, attrList)
{
	var csvOptions = {"header": true};
	var dataOptions = {"fields": attrList, "data": objArr};
	return papaparse.unparse(dataOptions);
}



module.exports =
{
	saveFile: saveCsvFile
};