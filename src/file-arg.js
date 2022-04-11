// This file is used to read, parse, and validate the file type argument.

const outputTypes = require("./common/output-types");
const exitProgram = require("./common/exit-program");


// Read argument.
function readFileTypeArgument()
{
	var argArrayExists = false;
	var passedArg = null;
	var readRes = "";
	
	// Read file type argument if it exists.
	argArrayExists = Array.isArray(process.argv);
	if (argArrayExists && process.argv.length > 2) passedArg = process.argv[2];
	
	// Use argument string if found.
	if (typeof passedArg === "string") readRes = passedArg.toLowerCase().trim();
	
	
	// Display error if argument is empty.
	if (!readRes.length > 0) displayInvalidError("Output type is missing.");
	
	return readRes;
}



// Prepare argument
function prepareFileTypeArgument(argString)
{
	var prepRes = -1;
	
	if (argString === "sql")
	{
		prepRes = outputTypes.modes.SQL;
	}
	else if (argString === "csv")
	{
		prepRes = outputTypes.modes.CSV;
	}
	else if (argString === "array")
	{
		prepRes = outputTypes.modes.ARRAY;
	}
	else if (argString === "object")
	{
		prepRes = outputTypes.modes.OBJECT;
	}
	else
	{
		prepRes = -1;
		displayInvalidError("Invalid output type.");
	}
	
	return prepRes;
}


// Error message.
function displayInvalidError(vContext)
{
	var errTxt = vContext + " Must be one of: " + outputTypes.getList();
	exitProgram.callError(errTxt, false);
}



module.exports =
{
	readFileType: readFileTypeArgument,
	prepareFileType: prepareFileTypeArgument
};