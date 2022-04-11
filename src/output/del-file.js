const path = require("path");
const fs = require("fs");
const fsErrors = require("../common/fs-errors");


function deleteOutputFile(baseFolder, entryObject, deleteCallback)
{
	var correctType = entryObject.isFile();
	
	if (correctType)
	{
		var fullFilePath = path.join(baseFolder, entryObject.name);
		callUnlink(fullFilePath, deleteCallback);
	}
	else
	{
		return deleteCallback(null, true);
	}
}



function callUnlink(fullPath, unlinkCallback)
{	
	fs.unlink(fullPath, function (deleteErr)
	{
		if (deleteErr !== null)
		{
			var flaggedMessage = fsErrors.writeFileAction("deleting", "existing output", fullPath, deleteErr.code);
			return unlinkCallback(new Error(flaggedMessage), null);
		}
		else
		{
			return unlinkCallback(null, true);
		}
	});
}



module.exports = deleteOutputFile;