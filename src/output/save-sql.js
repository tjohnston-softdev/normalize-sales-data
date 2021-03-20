const fs = require("fs");
const sqlString = require("sqlstring");
const fsErrors = require("../common/fs-errors");


function saveSqlFile(objectArray, fileSpecs, saveCallback)
{
	var sqlTextString = convertJsonToSql(objectArray, fileSpecs.tableName);
	var writeErrorText = "";
	
	fs.writeFile(fileSpecs.filePath, sqlTextString, function (writeErr)
	{
		if (writeErr !== null)
		{
			writeErrorText = fsErrors.writeActionText("writing", fileSpecs.tableName, fileSpecs.filePath, writeErr.code);
			return saveCallback(new Error(writeErrorText), null);
		}
		else
		{
			return saveCallback(null, true);
		}
	});
}



function convertJsonToSql(objArr, tblName)
{
	var sqlParams = [];
	var convRes = "";
	
	if (objArr.length > 0)
	{
		sqlParams = [tblName, objArr];
		convRes = sqlString.format("INSERT INTO ?? VALUES ?", sqlParams);
	}
	else
	{
		convRes = "/* " + tblName + " */";
	}
	
	return convRes;
}




module.exports =
{
	saveFile: saveSqlFile
};