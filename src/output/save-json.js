const fs = require("fs");
const yieldableJson = require("yieldable-json");
const fsErrors = require("../common/fs-errors");


function saveJsonFile(objectArray, fileSpecs, inclAttrs, saveCallback)
{
	var stringifyErrorText = "";
	
	if (inclAttrs === true)
	{
		convertToObjectMode(objectArray, fileSpecs.tableAttributes);
	}
	
	yieldableJson.stringifyAsync(objectArray, null, 4, 1, function (jsonErr, jsonTextString)
	{
		if (jsonErr !== null)
		{
			stringifyErrorText = writeStringifyErrorText(fileSpecs.tableName, jsonErr.message);
			return saveCallback(new Error(stringifyErrorText), null);
		}
		else
		{
			handleFileWrite(fileSpecs.filePath, jsonTextString, fileSpecs.tableName, saveCallback);
		}
	});
}


function handleFileWrite(wPath, wContents, wDesc, handleCallback)
{
	var writeErrorText = "";
	
	fs.writeFile(wPath, wContents, function(writeErr)
	{
		if (writeErr !== null)
		{
			writeErrorText = fsErrors.writeAction("writing", wDesc, wPath, writeErr.code);
			return handleCallback(new Error(writeErrorText), null);
		}
		else
		{
			return handleCallback(null, true);
		}
	});
	
}


function convertToObjectMode(dataArray, attrList)
{
	var dataIndex = 0;
	var currentArray = [];
	var currentObject = {};
	
	var propIndex = 0;
	var propCutoff = -1;
	var currentProp = "";
	var currentValue = null;
	
	for (dataIndex = 0; dataIndex < dataArray.length; dataIndex = dataIndex + 1)
	{
		currentArray = dataArray[dataIndex];
		currentObject = {};
		
		propIndex = 0;
		propCutoff = Math.min(currentArray.length, attrList.length);
		currentProp = "";
		currentValue = null;
		
		while (propIndex >= 0 && propIndex < propCutoff)
		{
			currentProp = attrList[propIndex];
			currentValue = currentArray[propIndex];
			currentObject[currentProp] = currentValue;
			
			propIndex = propIndex + 1;
		}
		
		dataArray[dataIndex] = currentObject;
	}
}


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