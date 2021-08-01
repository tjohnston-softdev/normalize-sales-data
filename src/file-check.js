// Validates source CSV file.

const fs = require("fs");
const ora = require("ora");
const fsErrors = require("./common/fs-errors");
const sourceFile = require("./common/source-file");
const maxSizeBytes = 5000000;							// 5MB size limit.


// Main function.
function checkInputDataFile(inputCheckCallback)
{
	var checkSpinner = ora("Checking Input File").start();
	
	coordinateInputCheck(function (dataFileErr, dataFileRes)
	{
		if (dataFileErr !== null)
		{
			checkSpinner.fail("Input File Check Error");
			return inputCheckCallback(dataFileErr, null);
		}
		else
		{
			checkSpinner.succeed("Input File Exists");
			return inputCheckCallback(null, dataFileRes);
		}
	});
}


// Check if file exists.
function coordinateInputCheck(inpChkCallback)
{
	var statErrorText = "";
	
	fs.stat(sourceFile.name, function (statErr, statRes)
	{
		if (statErr !== null)
		{
			// Error or missing.
			statErrorText = fsErrors.writeAction("checking", sourceFile.desc, sourceFile.name, statErr.code);
			return inpChkCallback(new Error(statErrorText), null);
		}
		else
		{
			// File exists - Validate size.
			verifyTargetEntry(statRes, inpChkCallback);
		}
	});
}



// Check file size.
function verifyTargetEntry(entryObj, verifyCallback)
{
	var validFile = entryObj.isFile();
	var verifyErrorText = "";
	
	if (validFile === true && entryObj.size > 0 && entryObj.size <= maxSizeBytes)
	{
		// Valid
		return verifyCallback(null, true);
	}
	else if (validFile === true && entryObj.size > maxSizeBytes)
	{
		// Too large.
		verifyErrorText = fsErrors.writeSourceVerify(sourceFile.desc, "cannot be larger than 5MB");
		return verifyCallback(new Error(verifyErrorText), null);
	}
	else if (validFile === true)
	{
		// Empty.
		verifyErrorText = fsErrors.writeSourceVerify(sourceFile.desc, "cannot be empty.");
		return verifyCallback(new Error(verifyErrorText), null);
	}
	else
	{
		// Missing.
		verifyErrorText = fsErrors.writeSourceVerify(sourceFile.desc, "does not exist.");
		return verifyCallback(new Error(verifyErrorText), null);
	}
}



module.exports =
{
	checkInput: checkInputDataFile
};