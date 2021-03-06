const fs = require("fs");
const papaparse = require("papaparse");
const ora = require("ora");
const fsErrors = require("./common/fs-errors");
const sourceFile = require("./common/source-file");
const valuePrep = require("./common/value-prep");
const csvErrors = require("./common/csv-errors");


function readInputDataFile(inputReadCallback)
{
	var readSpinner = ora("Reading Input File").start();
	
	coordinateInputRead(function (dataFileErr, dataFileRes)
	{
		if (dataFileErr !== null)
		{
			readSpinner.fail("Input Read Error");
			return inputReadCallback(dataFileErr, null);
		}
		else
		{
			readSpinner.succeed("Input File Read");
			return inputReadCallback(null, dataFileRes);
		}
	});
}


function coordinateInputRead(inpReadCallback)
{
	var readErrorText = "";
	
	fs.readFile(sourceFile.name, "utf8", function (readErr, retrievedText)
	{
		if (readErr !== null)
		{
			readErrorText = fsErrors.writeActionText("reading", sourceFile.desc, readErr.code);
			return inpReadCallback(new Error(readErrorText), null);
		}
		else
		{
			parseFileText(retrievedText, inpReadCallback);
		}
	});
}


function parseFileText(inpTxt, parseCallback)
{
	var csvOptions = {header: true, skipEmptyLines: true};
	var parseResultObject = papaparse.parse(inpTxt, csvOptions);
	var parseResultExists = valuePrep.checkObject(parseResultObject);
	var genericText = "";
	
	if (parseResultExists === true)
	{
		verifyParseResult(parseResultObject, parseCallback);
	}
	else
	{
		genericText = "Could not successfully parse input CSV.";
		return parseCallback(new Error(genericText), null);
	}
}


function verifyParseResult(parseResObj, verifyCallback)
{
	var dataArrayExists = Array.isArray(parseResObj.data);
	var errorArrayExists = Array.isArray(parseResObj.errors);
	var verifyErrorText = "";
	
	if (errorArrayExists === true && parseResObj.errors.length > 0)
	{
		verifyErrorText = csvErrors.writeSpecificParse(parseResObj.errors);
		return verifyCallback(new Error(verifyErrorText), null);
	}
	else if (dataArrayExists === true && parseResObj.data.length > 0)
	{
		return verifyCallback(null, parseResObj.data);
	}
	else
	{
		verifyErrorText = "No rows were successfully parsed from input CSV.";
		return verifyCallback(new Error(verifyErrorText), null);
	}
}



module.exports =
{
	readInput: readInputDataFile
};