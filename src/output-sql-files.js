const series = require("run-series");
const ora = require("ora");
const exportSpec = require("./output/export-spec");
const saveSql = require("./output/save-sql");


function writeSqlDataFiles(outputDataObject, outputTargetFolder, sqlDataCallback)
{
	var sqlSpinner = ora("Writing SQL Data Files").start();
	
	coordinateSqlWrite(outputDataObject, outputTargetFolder, function (dataErr, dataRes)
	{
		if (dataErr !== null)
		{
			sqlSpinner.fail("SQL File Write Error");
			return sqlDataCallback(dataErr, null);
		}
		else
		{
			sqlSpinner.succeed("SQL Files Written");
			return sqlDataCallback(null, true);
		}
	});
}



function coordinateSqlWrite(outputDataObj, outputTgtFolder, sqlWriteCallback)
{
	var specObject = exportSpec.getFileSpecifications(outputTgtFolder, "sql", false);
	
	series(
	[
		saveSql.saveFile.bind(null, outputDataObj.territories, specObject.territories),
		saveSql.saveFile.bind(null, [], specObject.countries)
	],
	function (writeBatchErr, writeBatchRes)
	{
		return sqlWriteCallback(writeBatchErr, writeBatchRes);
	});
}



module.exports =
{
	writeDataFiles: writeSqlDataFiles
};