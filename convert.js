const clear = require("clear");
const exitProgram = require("./src/common/exit-program");
const fileArg = require("./src/input/file-arg");
const fileCheck = require("./src/input/file-check");

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
	fileCheck.checkInput(function (inpReadTaskErr, inpReadTaskRes)
	{
		if (inpReadTaskErr !== null)
		{
			exitProgram.callError(inpReadTaskErr.message);
		}
		else
		{
			console.log("File valid");
		}
	});
}