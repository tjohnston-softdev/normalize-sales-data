const clear = require("clear");
const exitProgram = require("./src/common/exit-program");
const fileArg = require("./src/file-arg");
const fileCheck = require("./src/file-check");
const fileRead = require("./src/file-read");
const procData = require("./src/proc-data");
const outputFolder = require("./src/output-folder");

runDataNormalization();


function runDataNormalization()
{
	var givenFileType = fileArg.readFileType();
	var fileTypeFlag = fileArg.prepareFileType(givenFileType);
	
	if (fileTypeFlag >= 0)
	{
		clear();
		callInputFileCheck(fileTypeFlag);
	}
}


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


function callOutputFolder(normDataObj, cTypeFlag)
{
	outputFolder.createFolder(function (outputFolderErr, outputFolderPath)
	{
		if (outputFolderErr !== null)
		{
			exitProgram.callError(outputFolderErr.message, true);
		}
		else
		{
			callOutputFileWrite(normDataObj, outputFolderPath, cTypeFlag);
		}
	});
}


function callOutputFileWrite(normData, oFolderPth, cType)
{
	if (cType > 0)
	{
		exitProgram.callError("SQL Definition", true);
	}
	else if (cType === 0)
	{
		exitProgram.callError("CSV Data", true);
	}
	else
	{
		exitProgram.callError("Invalid", true);
	}
}