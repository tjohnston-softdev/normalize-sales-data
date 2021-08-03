const path = require("path");
const fs = require("fs");
const fsErrors = require("../common/fs-errors");


function deleteOutputFile(baseFolder, entryObject, deleteCallback)
{
	var correctType = entryObject.isFile();
	var fullFilePath = "";
	
	if (correctType === true)
	{
		fullFilePath = path.join(baseFolder, entryObject.name);
		callUnlink(fullFilePath, deleteCallback);
	}
	else
	{
		return deleteCallback(null, true);
	}
}



function callUnlink(fullPath, unlinkCallback)
{
	var flaggedMessage = "";
	
	fs.unlink(fullPath, function (delErr)
	{
		if (delErr !== null)
		{
			flaggedMessage = fsErrors.writeFileAction("deleting", "existing output", fullPath, delErr.code);
			return unlinkCallback(new Error(flaggedMessage), null);
		}
		else
		{
			return unlinkCallback(null, true);
		}
	});
}



module.exports = deleteOutputFile;