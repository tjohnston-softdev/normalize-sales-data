const ora = require("ora");
const normRes = require("./common/norm-res");
const inputErrors = require("./common/input-errors");
const generalPass = require("./processing/general-pass");
const orderSort = require("./processing/order-sort");
const orderPass = require("./processing/order-pass");


function processSalesData(originalDataSet, salesDataCallback)
{
	var processSpinner = ora("Normalizing Data").start();
	
	coordinateDataProcessing(originalDataSet, function (dataErr, dataRes)
	{
		if (dataErr !== null)
		{
			processSpinner.fail("Data Normalization Error");
			return salesDataCallback(dataErr, null);
		}
		else
		{
			processSpinner.succeed("Data Normalized");
			return salesDataCallback(null, dataRes);
		}
	});
}


function coordinateDataProcessing(origDataSet, dataCallback)
{
	var fullResultObject = normRes.initializeResult();
	var dataErrorText = "";
	
	generalPass.loopRows(origDataSet, fullResultObject);
	orderSort.sortRows(origDataSet, fullResultObject.canContinue);
	orderPass.loopRows(origDataSet, fullResultObject);
	
	if (fullResultObject.canContinue === true)
	{
		return dataCallback(null, fullResultObject.data);
	}
	else
	{
		dataErrorText = inputErrors.writeFullMessage(fullResultObject.error);
		return dataCallback(new Error(dataErrorText), null);
	}
}



module.exports =
{
	processData: processSalesData
};