// Reads source CSV file.

const fs = require("fs");
const papaparse = require("papaparse");
const ora = require("ora");
const fsErrors = require("./common/fs-errors");
const sourceFile = require("./common/source-file");
const valuePrep = require("./common/value-prep");
const csvErrors = require("./common/csv-errors");


// Main function.
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

// Read file contents.
function coordinateInputRead(inpReadCallback)
{
	var readErrorText = "";
	
	fs.readFile(sourceFile.name, "utf8", function (readErr, retrievedText)
	{
		if (readErr !== null)
		{
			// Error
			readErrorText = fsErrors.writeActionText("reading", sourceFile.desc, sourceFile.name, readErr.code);
			return inpReadCallback(new Error(readErrorText), null);
		}
		else
		{
			// Successful - parse as CSV.
			parseFileText(retrievedText, inpReadCallback);
		}
	});
}


// Converts CSV text into JSON array.
function parseFileText(inpTxt, parseCallback)
{
	var csvOptions = {header: true, skipEmptyLines: true};
	var parseResultObject = papaparse.parse(inpTxt, csvOptions);
	var parseResultExists = valuePrep.checkObject(parseResultObject);
	var genericText = "";
	
	if (parseResultExists === true)
	{
		// Conversion made - Check if successful.
		verifyParseResult(parseResultObject, parseCallback);
	}
	else
	{
		// Generic conversion error.
		genericText = "Could not successfully parse input CSV.";
		return parseCallback(new Error(genericText), null);
	}
}


// Checks if CSV parse is successful.
function verifyParseResult(parseResObj, verifyCallback)
{
	var dataArrayExists = Array.isArray(parseResObj.data);
	var errorArrayExists = Array.isArray(parseResObj.errors);
	var verifyErrorText = "";
	
	if (errorArrayExists === true && parseResObj.errors.length > 0)
	{
		// Error found.
		verifyErrorText = csvErrors.writeSpecificParse(parseResObj.errors);
		return verifyCallback(new Error(verifyErrorText), null);
	}
	else if (dataArrayExists === true && parseResObj.data.length > 0)
	{
		// Successful.
		return verifyCallback(null, parseResObj.data);
	}
	else
	{
		// Empty result.
		verifyErrorText = "No rows were successfully parsed from input CSV.";
		return verifyCallback(new Error(verifyErrorText), null);
	}
}



module.exports =
{
	readInput: readInputDataFile
};