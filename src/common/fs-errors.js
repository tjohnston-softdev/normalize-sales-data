function writeFileActionErrorText(vContext, vFileDesc, fsErrCode)
{
	var writeRes = "";
	
	writeRes += "Error ";
	writeRes += vContext;
	writeRes += " ";
	writeRes += vFileDesc;
	writeRes += " file. - ";
	writeRes += parseErrorCode(fsErrCode);
	
	return writeRes;
}


function writeSourceVerificationErrorText(vFileDesc, vContext)
{
	var writeRes = vFileDesc + " file " + vContext;
	return writeRes;
}


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
	writeActionText: writeFileActionErrorText,
	writeSourceVerification: writeSourceVerificationErrorText
};