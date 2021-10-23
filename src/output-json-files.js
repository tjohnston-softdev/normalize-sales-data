// Saves normalized data as JSON files.

const series = require("run-series");
const ora = require("ora-classic");
const exportSpec = require("./output/export-spec");
const saveJson = require("./output/save-json");


// Main function.
function writeJsonDataFiles(outputDataObject, outputTargetFolder, includeAttributes, jsonDataCallback)
{
	var jsonSpinner = ora("Writing JSON Data Files").start();
	
	coordinateJsonWrite(outputDataObject, outputTargetFolder, includeAttributes, function (dataErr, dataRes)
	{
		if (dataErr !== null)
		{
			jsonSpinner.fail("JSON File Write Error");
			return jsonDataCallback(dataErr, null);
		}
		else
		{
			jsonSpinner.succeed("JSON Files Written");
			return jsonDataCallback(null, true);
		}
	});
}


// Write output files.
function coordinateJsonWrite(outputDataObj, outputTgtFolder, inclAttributes, jsonWriteCallback)
{
	// Create specification object.
	var specObj = exportSpec.getFileSpecifications(outputTgtFolder, "json", inclAttributes);
	
	// Save files sequentially.
	series(
	[
		saveJson.saveFile.bind(null, outputDataObj.territories, specObj.territories, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.countries, specObj.countries, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.statesRegions, specObj.statesRegions, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.cities, specObj.cities, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.dealSizes, specObj.dealSizes, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.productLines, specObj.productLines, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.orderStatusModes, specObj.orderStatusModes, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.products, specObj.products, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.customers, specObj.customers, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.orderEntries, specObj.orderEntries, inclAttributes),
		saveJson.saveFile.bind(null, outputDataObj.orderItems, specObj.orderItems, inclAttributes)
	],
	function (writeBatchErr, writeBatchRes)
	{
		// Complete.
		return jsonWriteCallback(writeBatchErr, writeBatchRes);
	});
	
}


module.exports =
{
	writeDataFiles: writeJsonDataFiles
};