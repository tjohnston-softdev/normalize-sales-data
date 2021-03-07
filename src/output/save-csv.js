const fs = require("fs");
const papaparse = require("papaparse");
const valuePrep = require("../common/value-prep");
const fsErrors = require("../common/fs-errors");

const testData =
[
	{territoryID: "1", territoryName: "NA"},
	{territoryID: "2", territoryName: "EMEA"},
	{territoryID: "3", territoryName: "APAC"},
	{territoryID: "4", territoryName: "Japan"},
];


function saveCsvFile(objectArray, fileSpecs, saveCallback)
{
	var csvTextString = convertJsonToCsv(testData, fileSpecs.tableAttributes);
	var conversionSuccessful = valuePrep.checkString(csvTextString);
	
	if (conversionSuccessful === true)
	{
		handleFileWrite(fileSpecs.filePath, csvTextString, fileSpecs.tableName, saveCallback);
	}
}


function handleFileWrite(wPath, wContents, wDesc, handleCallback)
{
	var writeErrorText = "";
	
	fs.writeFile(wPath, wContents, function (writeErr)
	{
		if (writeErr !== null)
		{
			writeErrorText = fsErrors.writeActionText("writing", wDesc, wPath, writeErr.code);
			return handleCallback(new Error(writeErrorText), null);
		}
		else
		{
			return handleCallback(null, true);
		}
	});
}


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