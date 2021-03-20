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
	var specObj = exportSpec.getFileSpecifications(outputTgtFolder, "sql", false);
	
	series(
	[
		saveSql.saveFile.bind(null, outputDataObj.territories, specObj.territories),
		saveSql.saveFile.bind(null, outputDataObj.countries, specObj.countries),
		saveSql.saveFile.bind(null, outputDataObj.statesRegions, specObj.statesRegions),
		saveSql.saveFile.bind(null, outputDataObj.cities, specObj.cities),
		saveSql.saveFile.bind(null, outputDataObj.dealSizes, specObj.dealSizes),
		saveSql.saveFile.bind(null, outputDataObj.productLines, specObj.productLines),
		saveSql.saveFile.bind(null, outputDataObj.orderStatusModes, specObj.orderStatusModes),
		saveSql.saveFile.bind(null, outputDataObj.products, specObj.products),
		saveSql.saveFile.bind(null, outputDataObj.customers, specObj.customers),
		saveSql.saveFile.bind(null, outputDataObj.orderEntries, specObj.orderEntries),
		saveSql.saveFile.bind(null, outputDataObj.orderItems, specObj.orderItems)
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