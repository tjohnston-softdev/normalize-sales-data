const valueLimits = require("../common/value-limits");
const valueDefaults = require("../common/value-defaults");
const stringValue = require("./field-validation/string-value");
const numberValue = require("./field-validation/number-value");
const dateValue = require("./field-validation/date-value");
const orderDetails = require("./field-validation/order-details");


function loopDataRows(prepData, fullResultObj)
{
	var rowLoopIndex = 0;
	var currentRow = {};
	var currentIndex = -1;
	var currentQuantity = -1;
	var currentPrice = -1;
	var currentDate = {};
	var currentAddNumber = -1;
	var currentRowComplete = false;
	
	var loopOrderNumber = 0;
	
	while (rowLoopIndex >= 0 && rowLoopIndex < prepData.length && fullResultObj.canContinue === true)
	{
		currentRow = prepData[rowLoopIndex];
		currentIndex = currentRow.originalIndex;
		currentQuantity = -1;
		currentPrice = -1;
		currentDate = {};
		currentRowComplete = false;
		
		if (currentRow.orderNumber === loopOrderNumber)
		{
			currentRowComplete = true;
		}
		else if (currentRow.orderNumber > loopOrderNumber)
		{
			loopOrderNumber = currentRow.orderNumber;
			
			currentDate = dateValue.validateDate(currentIndex, currentRow, "ORDERDATE", fullResultObj);
			currentAddNumber = handleOrderAdd(currentIndex, currentRow, currentDate, fullResultObj);
			currentRowComplete = checkRowComplete(currentAddNumber, fullResultObj.data.orderEntries.length);
		}
		else
		{
			currentRowComplete = true;
		}
		
		if (currentRowComplete !== true)
		{
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex = rowLoopIndex + 1;
	}
}


function handleOrderAdd(rowIndex, rowObject, orderDateValidation, fullResult)
{
	var pCustomer = -1;
	var pDate = null;
	var pStatus = -1;
	var handleRes = -1;
	
	if (orderDateValidation.valid === true)
	{
		pCustomer = rowObject.customerNumber;
		pDate = orderDateValidation.dateObject;
		pStatus = rowObject.statusNumber;
		
		handleRes = orderDetails.addOrderEntry(rowObject.orderNumber, pCustomer, pDate, pStatus, fullResult.data.orderEntries);
	}
	
	return handleRes;
}


function checkRowComplete(addNum, arrLength)
{
	var checkRes = false;
	
	if (addNum > 0 && addNum <= arrLength)
	{
		checkRes = true;
	}
	
	return checkRes;
}



module.exports =
{
	loopRows: loopDataRows
};