// Creates output folder.

const path = require("path");
const fs = require("fs");
const ora = require("ora");
const each = require("async-each-series");
const series = require("run-series");
const fsErrors = require("./common/fs-errors");
const delFile = require("./output/del-file");


// Main function.
function createOutputDataFolder(outputFolderCallback)
{
	var folderSpinner = ora("Preparing Output Folder").start();
	
	initializeOutputFolder(function (outputErr, outputRes)
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


// Create directory if it does not exist.
function initializeOutputFolder(intlFolderCallback)
{
	var targetPathString = path.join(".", "output-files");
	var folderOpts = {recursive: true};
	var intlErrorText = "";
	
	fs.mkdir(targetPathString, folderOpts, function (createErr)
	{
		if (createErr !== null)
		{
			// Error.
			intlErrorText = fsErrors.writeFolderAction("creating", createErr.code);
			return intlFolderCallback(new Error(intlErrorText), null);
		}
		else
		{
			// Successful - Read contents.
			readExistingContents(targetPathString, intlFolderCallback);
		}
	});
}


// Reads list of existing items inside output folder.
function readExistingContents(tgtPathStr, readCallback)
{
	var readOpts = {encoding: "utf8", withFileTypes: true};
	var readErrorText = "";
	
	fs.readdir(tgtPathStr, readOpts, function (readErr, existingFiles)
	{
		if (readErr !== null)
		{
			// Error.
			readErrorText = fsErrors.writeFolderAction("reading", readErr.code);
			return readCallback(new Error(readErrorText), null);
		}
		else
		{
			// Successful - Delete files.
			cleanFolderContents(tgtPathStr, existingFiles, readCallback);
		}
	});
}


function cleanFolderContents(tgtPath, filesArr, cleanCallback)
{
	// Loop output folder items.
	each(filesArr,
	function (currentFile, iterationCallback)
	{
		// Delete current file.
		delFile(tgtPath, currentFile, iterationCallback);
	},
	function (cleanErr)
	{
		// Complete.
		if (cleanErr !== undefined)
		{
			// Error.
			return cleanCallback(cleanErr, null);
		}
		else
		{
			// All files deleted.
			return cleanCallback(null, true);
		}
	});
}



module.exports =
{
	createFolder: createOutputDataFolder
};