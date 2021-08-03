// This file is used to read, parse, and validate the file type argument.

const outputTypes = require("./common/output-types");
const exitProgram = require("./common/exit-program");


// Read argument.
function readFileTypeArgument()
{
	var argArrayExists = false;
	var passedArg = null;
	var argType = "";
	
	var readRes = "";
	
	
	// Checks whether argument array exists.
	argArrayExists = Array.isArray(process.argv);
	
	if (argArrayExists === true && process.argv.length >= 3)
	{
		// Read file type argument.
		passedArg = process.argv[2];
		argType = typeof passedArg;
	}
	
	
	if (argType === "string")
	{
		// Use string.
		readRes = passedArg.toLowerCase();
		readRes = readRes.trim();
	}
	
	if (readRes.length <= 0)
	{
		// Empty
		displayInvalidError("Output type is missing.");
	}
	
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
	var errTxt = "";
	
	errTxt += vContext
	errTxt += " Must be one of: ";
	errTxt += outputTypes.getList();
	
	exitProgram.callError(errTxt, false);
}



module.exports =
{
	readFileType: readFileTypeArgument,
	prepareFileType: prepareFileTypeArgument
};