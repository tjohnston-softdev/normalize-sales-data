// Used to prepare JSON data and save files.

const fs = require("fs");
const yieldableJson = require("yieldable-json");
const fsErrors = require("../common/fs-errors");


// Main function.
function saveJsonFile(objectArray, fileSpecs, inclAttrs, saveCallback)
{
	// Convert to array of objects.
	if (inclAttrs) convertToObjectMode(objectArray, fileSpecs.tableAttributes);
	
	// Convert JSON data to formatted string.
	yieldableJson.stringifyAsync(objectArray, null, 4, 1, function (jsonError, jsonTextString)
	{
		if (jsonError !== null)
		{
			var flaggedMessage = writeStringifyErrorText(fileSpecs.tableName, jsonError.message);
			return saveCallback(new Error(flaggedMessage), null);
		}
		else
		{
			handleFileWrite(fileSpecs.filePath, jsonTextString, fileSpecs.tableName, saveCallback);
		}
	});
}


// Save JSON file.
function handleFileWrite(jsonPath, jsonContents, jsonDesc, handleCallback)
{
	fs.writeFile(jsonPath, jsonContents, function(writeError)
	{
		if (writeError !== null)
		{
			var flaggedMessage = fsErrors.writeFileAction("writing", jsonDesc, jsonPath, writeError.code);
			return handleCallback(new Error(flaggedMessage), null);
		}
		else
		{
			return handleCallback(null, true);
		}
	});
	
}


// Convert multi-dimensional array to list of objects.
function convertToObjectMode(dataArray, attrList)
{	
	// Loop all rows for corresponding table.
	for (var dataIndex = 0; dataIndex < dataArray.length; dataIndex++)
	{
		// Read current row.
		var currentArray = dataArray[dataIndex];
		var currentObject = {};
		
		var propIndex = 0;
		var propCutoff = Math.min(currentArray.length, attrList.length);
		var currentProp = "";
		var currentValue = null;
		
		// Loop table columns.
		while (propIndex >= 0 && propIndex < propCutoff)
		{
			// Read current column.
			var currentProp = attrList[propIndex];
			var currentValue = currentArray[propIndex];
			
			// Add to object.
			currentObject[currentProp] = currentValue;
			
			propIndex += 1;
		}
		
		// Replace with prepared object.
		dataArray[dataIndex] = currentObject;
	}
}


// Convert JSON to string error.
function writeStringifyErrorText(vFileDesc, vReason)
{
	return ["Error converting ", vFileDesc, " data to readable text.\n", vReason].join("");
}


module.exports =
{
	saveFile: saveJsonFile
};