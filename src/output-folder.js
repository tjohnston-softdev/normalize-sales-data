const path = require("path");
const fs = require("fs");
const ora = require("ora");
const fsErrors = require("./common/fs-errors");


function createOutputDataFolder(outputFolderCallback)
{
	var folderSpinner = ora("Preparing Output Folder").start();
	
	coordinateFolderCreation(function (outputErr, outputRes)
	{
		if (outputErr !== null)
		{
			folderSpinner.fail("Output Folder Error");
			return outputFolderCallback(outputErr, null);
		}
		else
		{
			folderSpinner.succeed("Output Folder Prepared");
			return outputFolderCallback(null, outputRes);
		}
	});
	
	
}


function coordinateFolderCreation(folderCallback)
{
	var targetPath = path.join(".", "output-files");
	var folderOpts = {recursive: true};
	var folderErrorText = "";
	
	fs.mkdir(targetPath, folderOpts, function (folderErr)
	{
		if (folderErr !== null)
		{
			folderErrorText = fsErrors.writeFolderCreateText(folderErr.code);
			return folderCallback(new Error(folderErrorText), null);
		}
		else
		{
			return folderCallback(null, targetPath);
		}
	});
}



module.exports =
{
	createFolder: createOutputDataFolder
};