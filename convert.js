const clear = require("clear");
const exitProgram = require("./src/common/exit-program");
const fileArg = require("./src/input/file-arg");
const fileCheck = require("./src/input/file-check");
const fileRead = require("./src/input/file-read");

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
	fileCheck.checkInput(function (inpChkTaskErr, inpChkTaskRes)
	{
		if (inpChkTaskErr !== null)
		{
			exitProgram.callError(inpChkTaskErr.message);
		}
		else
		{
			callInputFileRead(conversionTypeFlag);
		}
	});
}


function callInputFileRead(convTypeFlag)
{
	fileRead.readInput(function (inpReadTaskErr, inpReadTaskRes)
	{
		if (inpReadTaskErr !== null)
		{
			exitProgram.callError(inpReadTaskErr.message);
		}
		else
		{
			exitProgram.callSuccessful();
		}
	});
}