// This file is used to read, parse, and validate the file type argument.

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
	}
	
	return readRes;
}



// Prepare argument
function prepareFileTypeArgument(argString)
{
	var prepRes = -1;
	
	if (argString === "sql")
	{
		prepRes = 1;
	}
	else if (argString === "csv")
	{
		prepRes = 0;
	}
	else
	{
		prepRes = -1;
		exitProgram.callError("Invalid file type. Must enter 'sql' or 'csv'", false);
	}
	
	return prepRes;
}



module.exports =
{
	readFileType: readFileTypeArgument,
	prepareFileType: prepareFileTypeArgument
};