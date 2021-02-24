const fs = require("fs");
const ora = require("ora");
const fsErrors = require("../common/fs-errors");
const sourceFile = require("../common/source-file");
const maxSizeBytes = 5000000;


function checkInputDataFile(inputReadCallback)
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
	var statErrorText = "";
	
	fs.stat(sourceFile.name, function (statErr, statRes)
	{
		if (statErr !== null)
		{
			statErrorText = fsErrors.writeActionText("checking", sourceFile.desc, statErr.code);
			return inpReadCallback(new Error(statErrorText), null);
		}
		else
		{
			verifyTargetEntry(statRes, inpReadCallback);
		}
	});
}



function verifyTargetEntry(entryObj, verificationCallback)
{
	var validFile = entryObj.isFile();
	var verifyErrorText = "";
	
	if (validFile === true && entryObj.size > 0 && entryObj.size <= maxSizeBytes)
	{
		return verificationCallback(null, true);
	}
	else if (validFile === true && entryObj.size > maxSizeBytes)
	{
		verifyErrorText = fsErrors.writeSourceVerification(sourceFile.desc, "cannot be larger than 5MB");
		return verificationCallback(new Error(verifyErrorText), null);
	}
	else if (validFile === true)
	{
		verifyErrorText = fsErrors.writeSourceVerification(sourceFile.desc, "cannot be empty.");
		return verificationCallback(new Error(verifyErrorText), null);
	}
	else
	{
		verifyErrorText = fsErrors.writeSourceVerification(sourceFile.desc, "does not exist.");
		return verificationCallback(new Error(verifyErrorText), null);
	}
}



module.exports =
{
	checkInput: checkInputDataFile
};