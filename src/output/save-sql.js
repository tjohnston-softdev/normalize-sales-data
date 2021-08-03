// Used to save SQL files.

const fs = require("fs");
const sqlString = require("sqlstring");
const fsErrors = require("../common/fs-errors");


function saveSqlFile(objectArray, fileSpecs, saveCallback)
{
	var sqlTextString = convertJsonToSql(objectArray, fileSpecs.tableName);
	var writeErrorText = "";
	
	
	// Writes output file.
	fs.writeFile(fileSpecs.filePath, sqlTextString, function (writeErr)
	{
		if (writeErr !== null)
		{
			// Error
			writeErrorText = fsErrors.writeAction("writing", fileSpecs.tableName, fileSpecs.filePath, writeErr.code);
			return saveCallback(new Error(writeErrorText), null);
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
	var sqlParams = [];
	var convRes = "";
	
	if (objArr.length > 0)
	{
		// Formatted statement.
		sqlParams = [tblName, objArr];
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