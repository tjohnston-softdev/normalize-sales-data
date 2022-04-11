// Used to save SQL files.

const fs = require("fs");
const sqlString = require("sqlstring");
const fsErrors = require("../common/fs-errors");


function saveSqlFile(objectArray, fileSpecs, saveCallback)
{
	var sqlTextString = convertJsonToSql(objectArray, fileSpecs.tableName);
	
	
	// Writes output file.
	fs.writeFile(fileSpecs.filePath, sqlTextString, function (writeError)
	{
		if (writeError !== null)
		{
			// Error
			var flaggedMessage = fsErrors.writeFileAction("writing", fileSpecs.tableName, fileSpecs.filePath, writeError.code);
			return saveCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// Successful
			return saveCallback(null, true);
		}
	});
}



// Converts JSON array to SQL definition.
function convertJsonToSql(objArr, tblName)
{
	var convRes = "";
	
	if (objArr.length > 0)
	{
		// Formatted statement.
		var sqlParams = [tblName, objArr];
		convRes = sqlString.format("INSERT INTO ?? VALUES ?;", sqlParams);
	}
	else
	{
		// Placeholder comment.
		convRes = "/* " + tblName + " */";
	}
	
	return convRes;
}




module.exports =
{
	saveFile: saveSqlFile
};