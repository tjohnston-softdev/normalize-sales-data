// normalize-sales-data

const clear = require("clear");
const outputTypes = require("./src/common/output-types");
const exitProgram = require("./src/common/exit-program");
const fileArg = require("./src/file-arg");
const fileCheck = require("./src/file-check");
const fileRead = require("./src/file-read");
const procData = require("./src/proc-data");
const outputFolder = require("./src/output-folder");
const outputCsvFiles = require("./src/output-csv-files");
const outputSqlFiles = require("./src/output-sql-files");
const outputJsonFiles = require("./src/output-json-files");

runDataNormalization();


// Main function.
function runDataNormalization()
{
	var givenOutputType = "";
	var preparedFlag = -1;
	
	// Reads and validates file type argument.
	givenOutputType = fileArg.readFileType();
	
	if (givenOutputType.length > 0)
	{
		preparedFlag = fileArg.prepareFileType(givenOutputType);
	}
	
	if (preparedFlag > 0)
	{
		clear();
		outputTypes.saveEntry(preparedFlag);
		callInputFileCheck();
	}
}


// Check source CSV file.
function callInputFileCheck()
{
	fileCheck.checkInput(function (inpChkErr)
	{
		if (inpChkErr !== null)
		{
			exitProgram.callError(inpChkErr.message, true);
		}
		else
		{
			callInputFileRead();
		}
	});
}


// Read source file.
function callInputFileRead()
{
	fileRead.readInput(function (inpReadErr, inpReadData)
	{
		if (inpReadErr !== null)
		{
			exitProgram.callError(inpReadErr.message, true);
		}
		else
		{
			callDataProcessing(inpReadData);
		}
	});
}


// Normalize CSV data.
function callDataProcessing(retrievedCsvData)
{
	procData.processData(retrievedCsvData, function (dataProcErr, normalizedDataObject)
	{
		if (dataProcErr !== null)
		{
			exitProgram.callError(dataProcErr.message, true);
		}
		else
		{
			callOutputFolder(normalizedDataObject);
		}
	});
}

// Create output folder.
function callOutputFolder(normalizedDataObj)
{
	outputFolder.createFolder(function (outputFolderErr, outputFolderPath)
	{
		if (outputFolderErr !== null)
		{
			exitProgram.callError(outputFolderErr.message, true);
		}
		else
		{
			callOutputFileWrite(normalizedDataObj, outputFolderPath);
		}
	});
}


// Coordinate output.
function callOutputFileWrite(normalizedData, oFolderPth)
{
	var oType = outputTypes.getEntry();
	
	if (oType === outputTypes.modes.SQL)
	{
		// SQL definition files.
		callSqlOutput(normalizedData, oFolderPth);
	}
	else if (oType === outputTypes.modes.CSV)
	{
		// CSV data files.
		callCsvOutput(normalizedData, oFolderPth);
	}
	else if (oType === outputTypes.modes.ARRAY)
	{
		// Multi-dimensional JSON array files.
		callJsonOutput(normalizedData, oFolderPth, false);
	}
	else if (oType === outputTypes.modes.OBJECT)
	{
		// JSON object array files.
		callJsonOutput(normalizedData, oFolderPth, true);
	}
	else
	{
		// Error
		exitProgram.callError("Invalid Output Type", true);
	}
}


// Output normalized data as SQL files.
function callSqlOutput(normData, oFolder)
{
	outputSqlFiles.writeDataFiles(normData, oFolder, function (sqlOutputErr, sqlOutputRes)
	{
		if (sqlOutputErr !== null)
		{
			exitProgram.callError(sqlOutputErr.message, true);
		}
		else
		{
			exitProgram.callSuccessful();
		}
	});
}

// Output normalized data as CSV files.
function callCsvOutput(normData, oFolder)
{
	outputCsvFiles.writeDataFiles(normData, oFolder, function (csvOutputErr, csvOutputRes)
	{
		if (csvOutputErr !== null)
		{
			exitProgram.callError(csvOutputErr.message, true);
		}
		else
		{
			exitProgram.callSuccessful();
		}
	});
}


// Output normalized data as JSON files.
function callJsonOutput(normData, oFolder, objMode)
{
	outputJsonFiles.writeDataFiles(normData, oFolder, objMode, function (jsonOutputErr, jsonOutputRes)
	{
		if (jsonOutputErr !== null)
		{
			exitProgram.callError(jsonOutputErr.message, true);
		}
		else
		{
			exitProgram.callSuccessful();
		}
	});
}