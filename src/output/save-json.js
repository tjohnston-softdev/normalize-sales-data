// Used to prepare JSON data and save files.

const fs = require("fs");
const yieldableJson = require("yieldable-json");
const fsErrors = require("../common/fs-errors");


// Main function.
function saveJsonFile(objectArray, fileSpecs, inclAttrs, saveCallback)
{
	var stringifyErrorText = "";
	
	if (inclAttrs === true)
	{
		// Convert to array of objects.
		convertToObjectMode(objectArray, fileSpecs.tableAttributes);
	}
	
	// Convert JSON data to formatted string.
	yieldableJson.stringifyAsync(objectArray, null, 4, 1, function (jsonErr, jsonTextString)
	{
		if (jsonErr !== null)
		{
			// Conversion error.
			stringifyErrorText = writeStringifyErrorText(fileSpecs.tableName, jsonErr.message);
			return saveCallback(new Error(stringifyErrorText), null);
		}
		else
		{
			// String prepared.
			handleFileWrite(fileSpecs.filePath, jsonTextString, fileSpecs.tableName, saveCallback);
		}
	});
}


// Save JSON file.
function handleFileWrite(wPath, wContents, wDesc, handleCallback)
{
	var writeErrorText = "";
	
	fs.writeFile(wPath, wContents, function(writeErr)
	{
		if (writeErr !== null)
		{
			// Error.
			writeErrorText = fsErrors.writeFileAction("writing", wDesc, wPath, writeErr.code);
			return handleCallback(new Error(writeErrorText), null);
		}
		else
		{
			// Successful.
			return handleCallback(null, true);
		}
	});
	
}


// Convert MD array to list of objects.
function convertToObjectMode(dataArray, attrList)
{
	var dataIndex = 0;
	var currentArray = [];
	var currentObject = {};
	
	var propIndex = 0;
	var propCutoff = -1;
	var currentProp = "";
	var currentValue = null;
	
	// Loop all rows for corresponding table.
	for (dataIndex = 0; dataIndex < dataArray.length; dataIndex = dataIndex + 1)
	{
		// Read current row.
		currentArray = dataArray[dataIndex];
		currentObject = {};
		
		propIndex = 0;
		propCutoff = Math.min(currentArray.length, attrList.length);
		currentProp = "";
		currentValue = null;
		
		// Loop table columns.
		while (propIndex >= 0 && propIndex < propCutoff)
		{
			// Read current column.
			currentProp = attrList[propIndex];
			currentValue = currentArray[propIndex];
			
			// Add to object.
			currentObject[currentProp] = currentValue;
			
			propIndex = propIndex + 1;
		}
		
		// Replace with prepared object.
		dataArray[dataIndex] = currentObject;
	}
}


// Convert JSON to string error.
function writeStringifyErrorText(vFileDesc, vReason)
{
	var writeRes = "";
	
	writeRes += "Error converting ";
	writeRes += vFileDesc;
	writeRes += " data to readable text.\n";
	writeRes += vReason;
	
	return writeRes;
}


module.exports =
{
	saveFile: saveJsonFile
};