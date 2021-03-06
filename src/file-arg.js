const exitProgram = require("./common/exit-program");

function readFileTypeArgument()
{
	var argArrayExists = Array.isArray(process.argv);
	var passedArg = null;
	var argType = "";
	
	var readRes = "";
	
	if (argArrayExists === true && process.argv.length >= 3)
	{
		passedArg = process.argv[2];
		argType = typeof passedArg;
	}
	
	if (argType === "string")
	{
		readRes = passedArg.toLowerCase();
	}
	
	return readRes;
}



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
		prepRes = 1;
		//exitProgram.callError("Invalid file type. Must enter 'sql' or 'csv'");
	}
	
	return prepRes;
}



module.exports =
{
	readFileType: readFileTypeArgument,
	prepareFileType: prepareFileTypeArgument
};