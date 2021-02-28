const clear = require("clear");
const exitProgram = require("./src/common/exit-program");
const fileArg = require("./src/input/file-arg");
const fileCheck = require("./src/input/file-check");
const fileRead = require("./src/input/file-read");
const procData = require("./src/processing/proc-data");

runDataNormalization();


function runDataNormalization()
{
	var givenFileType = fileArg.readFileType();
	var fileTypeFlag = fileArg.prepareFileType(givenFileType);
	
	clear();
	callInputFileCheck(fileTypeFlag);
}


function callInputFileCheck(conversionTypeFlag)
{
	fileCheck.checkInput(function (inpChkErr)
	{
		if (inpChkErr !== null)
		{
			exitProgram.callError(inpChkErr.message);
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
			exitProgram.callError(inpReadErr.message);
		}
		else
		{
			callDataProcessing(inpReadData, convTypeFlag);
		}
	});
}


function callDataProcessing(retrievedCsvData, convType)
{
	procData.processData(retrievedCsvData, function (dataProcErr, dataProcRes)
	{
		if (dataProcErr !== null)
		{
			exitProgram.callError(dataProcErr.message);
		}
		else
		{
			console.log(dataProcRes.products.length);
		}
	});
}