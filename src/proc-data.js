// Coordinates data normalization.

const ora = require("ora-classic");
const normRes = require("./common/norm-res");
const inputErrors = require("./common/input-errors");
const generalPass = require("./processing/general-pass");
const orderSort = require("./processing/order-sort");
const orderPass = require("./processing/order-pass");


// Main function.
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


// Process data
function coordinateDataProcessing(origDataSet, dataCallback)
{
	var fullResultObject = normRes.initializeResult();
	var dataErrorText = "";
	
	generalPass.loopRows(origDataSet, fullResultObject);				// General data.
	orderSort.sortRows(origDataSet, fullResultObject.canContinue);		// Sort by order.
	orderPass.loopRows(origDataSet, fullResultObject);					// Order data
	
	
	if (fullResultObject.canContinue)
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