const runSeries = require("run-series");
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
	saveCsv.saveFile(outputDataObj.territories, specObject.territories, csvWriteCallback);
}



module.exports =
{
	writeDataFiles: writeCsvDataFiles
};