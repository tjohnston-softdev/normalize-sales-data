const valueLimits = require("../common/value-limits");
const valueDefaults = require("../common/value-defaults");
const stringValue = require("./field-validation/string-value");
const numberValue = require("./field-validation/number-value");
const dateValue = require("./field-validation/date-value");
const orderDetails = require("./object-definition/order-details");


function loopDataRows(prepData, fullResultObj)
{
	var rowLoopIndex = 0;
	var currentRow = {};
	var currentIndex = -1;
	var currentQuantity = -1;
	var currentPrice = -1;
	var currentDate = {};
	var currentOrderAdd = -1;
	var currentLineAllowed = false;
	var currentLineAdd = -1;
	var currentRowComplete = false;
	
	var loopOrderNumber = 0;
	
	while (rowLoopIndex >= 0 && rowLoopIndex < prepData.length && fullResultObj.canContinue === true)
	{
		currentRow = prepData[rowLoopIndex];
		currentIndex = currentRow.originalIndex;
		currentQuantity = -1;
		currentPrice = -1;
		currentDate = {};
		currentOrderAdd = -1;
		currentLineAllowed = false;
		currentLineAdd = -1;
		currentRowComplete = false;
		
		currentQuantity = handleQuantityValidation(rowLoopIndex, currentRow, fullResultObj);
		currentPrice = handlePriceValidation(rowLoopIndex, currentRow, currentQuantity, fullResultObj);
		
		if (currentRow.orderNumber === loopOrderNumber)
		{
			currentLineAllowed = Number.isFinite(currentPrice);
			currentLineAdd = handleItemAdd(rowLoopIndex, currentRow, currentQuantity, currentPrice, fullResultObj, currentLineAllowed);
			currentRowComplete = checkAdd(currentLineAdd, fullResultObj.data.orderItems.length);
		}
		else if (currentRow.orderNumber > loopOrderNumber)
		{
			loopOrderNumber = currentRow.orderNumber;
			
			currentDate = dateValue.validateDate(currentIndex, currentRow, "ORDERDATE", fullResultObj);
			currentOrderAdd = handleOrderAdd(currentIndex, currentRow, currentDate, fullResultObj);
			currentLineAllowed = checkAdd(currentOrderAdd, fullResultObj.data.orderEntries.length);
			currentLineAdd = handleItemAdd(rowLoopIndex, currentRow, currentQuantity, currentPrice, fullResultObj, currentLineAllowed);
			currentRowComplete = checkAdd(currentLineAdd, fullResultObj.data.orderItems.length);
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


function handleQuantityValidation(rowIndex, rowObject, fullResult)
{
	var handleRes = -1;
	handleRes = numberValue.validateWhole(rowIndex, rowObject, "QUANTITYORDERED", valueLimits.orderQuantity, valueDefaults.quantityOrdered, false, fullResult);
	return handleRes;
}


function handlePriceValidation(rowIndex, rowObject, quantityValue, fullResult)
{
	var quantityValid = Number.isInteger(quantityValue);
	var handleRes = -1;
	
	if (quantityValid === true)
	{
		handleRes = numberValue.validateDecimal(rowIndex, rowObject, "PRICEEACH", valueLimits.currency, valueDefaults.priceEach, true, fullResult);
	}
	
	return handleRes;
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
		
		handleRes = orderDetails.addEntry(rowObject.orderNumber, pCustomer, pDate, pStatus, fullResult.data.orderEntries);
	}
	
	return handleRes;
}


function handleItemAdd(rowIndex, rowObject, quantityValue, priceValue, fullResult, allowAdd)
{
	var pOrder = -1;
	var pLine = -1;
	var pProduct = -1;
	var pDeal = -1;
	
	var handleRes = -1;
	
	if (allowAdd === true)
	{
		pOrder = rowObject.orderNumber;
		pLine = rowObject.lineNumber;
		pProduct = rowObject.productNumber;
		pDeal = rowObject.dealSizeNumber;
		
		handleRes = orderDetails.addItem(pOrder, pLine, pProduct, quantityValue, priceValue, pDeal, rowIndex, fullResult.data.orderItems);
	}
	
	return handleRes;
}


function checkAdd(addNum, arrLength)
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