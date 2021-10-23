// Writes file system related errors.

const path = require("path");

// File action: reading, writing, etc.
function writeFileActionErrorText(vContext, vFileDesc, vFilePath, fsErrCode)
{
	var writeRes = "";
	
	writeRes += ["Error ", vContext, " ", vFileDesc, " file. - "].join("");
	writeRes += parseErrorCode(fsErrCode);
	writeRes += ["\n", "Path: "].join("");
	writeRes += path.resolve(vFilePath);
	
	return writeRes;
}


// Invalid source CSV file.
function writeSourceVerificationErrorText(vFileDesc, vContext)
{
	var writeRes = vFileDesc + " file " + vContext;
	return writeRes;
}


// Create output folder.
function writeFolderActionErrorText(vContext, fsErrCode)
{
	var writeRes = ["Error ", vContext, " output folder - ", fsErrCode].join("");
	return writeRes;
}


// Parses relevant error codes into readable description.
function parseErrorCode(eCode)
{
	var parseRes = "";
	
	if (eCode === "EACCES" || eCode === "EPERM")
	{
		parseRes = "Operation is not allowed under the current permissions."
	}
	else if (eCode === "EISDIR")
	{
		parseRes = "Target refers to a directory.";
	}
	else if (eCode === "EMFILE")
	{
		parseRes = "Too many files are currently open.";
	}
	else if (eCode === "ENOENT")
	{
		parseRes = "Target does not exist.";
	}
	else
	{
		parseRes = "Unknown cause. (" + eCode + ")";
	}
	
	return parseRes;
}



module.exports =
{
	writeFileAction: writeFileActionErrorText,
	writeSourceVerify: writeSourceVerificationErrorText,
	writeFolderAction: writeFolderActionErrorText
};