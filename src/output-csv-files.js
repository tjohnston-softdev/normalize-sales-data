// Saves normalized data as CSV files.

const series = require("run-series");
const ora = require("ora");
const exportSpec = require("./output/export-spec");
const saveCsv = require("./output/save-csv");


// Main function.
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


// Write output files.
function coordinateCsvWrite(outputDataObj, outputTgtFolder, csvWriteCallback)
{
	// Create specification object.
	var specObj = exportSpec.getFileSpecifications(outputTgtFolder, "csv", true);
	
	
	// Save files sequentially.
	series(
	[
		saveCsv.saveFile.bind(null, outputDataObj.territories, specObj.territories),
		saveCsv.saveFile.bind(null, outputDataObj.countries, specObj.countries),
		saveCsv.saveFile.bind(null, outputDataObj.statesRegions, specObj.statesRegions),
		saveCsv.saveFile.bind(null, outputDataObj.cities, specObj.cities),
		saveCsv.saveFile.bind(null, outputDataObj.dealSizes, specObj.dealSizes),
		saveCsv.saveFile.bind(null, outputDataObj.productLines, specObj.productLines),
		saveCsv.saveFile.bind(null, outputDataObj.orderStatusModes, specObj.orderStatusModes),
		saveCsv.saveFile.bind(null, outputDataObj.products, specObj.products),
		saveCsv.saveFile.bind(null, outputDataObj.customers, specObj.customers),
		saveCsv.saveFile.bind(null, outputDataObj.orderEntries, specObj.orderEntries),
		saveCsv.saveFile.bind(null, outputDataObj.orderItems, specObj.orderItems)
	],
	function (writeBatchErr, writeBatchRes)
	{
		// Complete.
		return csvWriteCallback(writeBatchErr, writeBatchRes);
	});
}



module.exports =
{
	writeDataFiles: writeCsvDataFiles
};