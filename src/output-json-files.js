const series = require("run-series");
const ora = require("ora");
const exportSpec = require("./output/export-spec");
const saveJson = require("./output/save-json");


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


function coordinateJsonWrite(outputDataObj, outputTgtFolder, inclAttributes, jsonWriteCallback)
{
	var specObj = exportSpec.getFileSpecifications(outputTgtFolder, "json", inclAttributes);
	
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
		return jsonWriteCallback(writeBatchErr, writeBatchRes);
	});
	
}


module.exports =
{
	writeDataFiles: writeJsonDataFiles
};