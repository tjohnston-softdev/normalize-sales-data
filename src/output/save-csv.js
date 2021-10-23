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
	
	if (conversionSuccessful === true)
	{
		handleFileWrite(fileSpecs.filePath, csvTextString, fileSpecs.tableName, saveCallback);
	}
}


// Save CSV file.
function handleFileWrite(wPath, wContents, wDesc, handleCallback)
{
	var writeErrorText = "";
	
	fs.writeFile(wPath, wContents, function (writeErr)
	{
		if (writeErr !== null)
		{
			// Error
			writeErrorText = fsErrors.writeFileAction("writing", wDesc, wPath, writeErr.code);
			return handleCallback(new Error(writeErrorText), null);
		}
		else
		{
			// Successful
			return handleCallback(null, true);
		}
	});
}


// Converts JSON array to CSV string.
function convertJsonToCsv(objArr, attrList)
{
	var csvOptions = {"header": true};
	var dataOptions = {"fields": attrList, "data": objArr};
	var convRes = papaparse.unparse(dataOptions);
	
	return convRes;
}



module.exports =
{
	saveFile: saveCsvFile
};