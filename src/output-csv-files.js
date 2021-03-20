const series = require("run-series");
const ora = require("ora");
const exportSpec = require("./output/export-spec");
const saveCsv = require("./output/save-csv");


function writeCsvDataFiles(outputDataObject, outputTargetFolder, csvDataCallback)
{
	var csvSpinner = ora("Writing CSV Data Files").start();
	
	coordinateCsvWrite(outputDataObject, outputTargetFolder, function (dataErr, dataRes)
	{
		if (dataErr !== null)
		{
			csvSpinner.fail("CSV File Write Error");
			return csvDataCallback(dataErr, null);
		}
		else
		{
			csvSpinner.succeed("CSV Files Written");
			return csvDataCallback(null, true);
		}
	});
}


function coordinateCsvWrite(outputDataObj, outputTgtFolder, csvWriteCallback)
{
	var specObject = exportSpec.getFileSpecifications(outputTgtFolder, "csv", true);
	
	series(
	[
		saveCsv.saveFile.bind(null, outputDataObj.territories, specObject.territories),
		saveCsv.saveFile.bind(null, outputDataObj.countries, specObject.countries),
		saveCsv.saveFile.bind(null, outputDataObj.statesRegions, specObject.statesRegions),
		saveCsv.saveFile.bind(null, outputDataObj.cities, specObject.cities),
		saveCsv.saveFile.bind(null, outputDataObj.dealSizes, specObject.dealSizes),
		saveCsv.saveFile.bind(null, outputDataObj.productLines, specObject.productLines),
		saveCsv.saveFile.bind(null, outputDataObj.orderStatusModes, specObject.orderStatusModes),
		saveCsv.saveFile.bind(null, outputDataObj.products, specObject.products),
		saveCsv.saveFile.bind(null, outputDataObj.customers, specObject.customers),
		saveCsv.saveFile.bind(null, outputDataObj.orderEntries, specObject.orderEntries),
		saveCsv.saveFile.bind(null, outputDataObj.orderItems, specObject.orderItems)
	],
	function (writeBatchErr, writeBatchRes)
	{
		return csvWriteCallback(writeBatchErr, writeBatchRes);
	});
}



module.exports =
{
	writeDataFiles: writeCsvDataFiles
};