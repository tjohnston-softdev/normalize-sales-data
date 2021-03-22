// normalize-sales-data

const clear = require("clear");
const exitProgram = require("./src/common/exit-program");
const fileArg = require("./src/file-arg");
const fileCheck = require("./src/file-check");
const fileRead = require("./src/file-read");
const procData = require("./src/proc-data");
const outputFolder = require("./src/output-folder");
const outputCsvFiles = require("./src/output-csv-files");
const outputSqlFiles = require("./src/output-sql-files");

runDataNormalization();


// Main function.
function runDataNormalization()
{
	var givenFileType = "";
	var fileTypeFlag = null;
	
	// Reads and validates file type argument.
	givenFileType = fileArg.readFileType();
	fileTypeFlag = fileArg.prepareFileType(givenFileType);
	
	if (fileTypeFlag >= 0)
	{
		clear();
		callInputFileCheck(fileTypeFlag);
	}
}


// Check source CSV file.
function callInputFileCheck(conversionTypeFlag)
{
	fileCheck.checkInput(function (inpChkErr)
	{
		if (inpChkErr !== null)
		{
			exitProgram.callError(inpChkErr.message, true);
		}
		else
		{
			callInputFileRead(conversionTypeFlag);
		}
	});
}


// Read source file.
function callInputFileRead(convTypeFlag)
{
	fileRead.readInput(function (inpReadErr, inpReadData)
	{
		if (inpReadErr !== null)
		{
			exitProgram.callError(inpReadErr.message, true);
		}
		else
		{
			callDataProcessing(inpReadData, convTypeFlag);
		}
	});
}


// Normalize CSV data.
function callDataProcessing(retrievedCsvData, convType)
{
	procData.processData(retrievedCsvData, function (dataProcErr, normalizedDataObject)
	{
		if (dataProcErr !== null)
		{
			exitProgram.callError(dataProcErr.message, true);
		}
		else
		{
			callOutputFolder(normalizedDataObject, convType);
		}
	});
}

// Create output folder.
function callOutputFolder(normalizedDataObj, cTypeFlag)
{
	outputFolder.createFolder(function (outputFolderErr, outputFolderPath)
	{
		if (outputFolderErr !== null)
		{
			exitProgram.callError(outputFolderErr.message, true);
		}
		else
		{
			callOutputFileWrite(normalizedDataObj, outputFolderPath, cTypeFlag);
		}
	});
}


// Coordinate output.
function callOutputFileWrite(normalizedData, oFolderPth, cType)
{
	if (cType > 0)
	{
		// SQL definition files.
		callSqlOutput(normalizedData, oFolderPth);
	}
	else if (cType === 0)
	{
		// CSV data files.
		callCsvOutput(normalizedData, oFolderPth);
	}
	else
	{
		// Error
		exitProgram.callError("Invalid File Type", true);
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