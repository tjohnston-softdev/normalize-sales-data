/*
	* This file is used to normalize data specifically related to orders.
	* This is done in a separate pass so that the entries are defined in correct order.
	* Original row order is remembered.
*/

const valueLimits = require("../common/value-limits");
const valueDefaults = require("../common/value-defaults");
const stringValue = require("./field-validation/string-value");
const numberValue = require("./field-validation/number-value");
const dateValue = require("./field-validation/date-value");
const orderDetails = require("./object-definition/order-details");


// Main function.
function loopDataRows(prepData, fullResultObj)
{
	var rowLoopIndex = 0;
	var loopOrderNumber = 0;
	
	// Loop each row until end reached or error flagged.
	while (rowLoopIndex >= 0 && rowLoopIndex < prepData.length && fullResultObj.canContinue)
	{
		var currentRow = prepData[rowLoopIndex];
		var currentIndex = currentRow.originalIndex;
		
		// Validates the quantity and price, as they are common to both scenarios.
		var currentQuantity = handleQuantityValidation(currentIndex, currentRow, fullResultObj);
		var currentPrice = handlePriceValidation(currentIndex, currentRow, currentQuantity, fullResultObj);
		
		var currentLineAllowed = false;
		var currentLineAdd = -1;
		var currentRowComplete = false;
		
		
		if (currentRow.orderNumber === loopOrderNumber)
		{
			// Add next order item.
			currentLineAllowed = Number.isFinite(currentPrice);
			currentLineAdd = handleItemAdd(currentIndex, currentRow, currentQuantity, currentPrice, fullResultObj, currentLineAllowed);
			currentRowComplete = checkAdd(currentLineAdd, fullResultObj.data.orderItems.length);
		}
		else if (currentRow.orderNumber > loopOrderNumber)
		{
			// New order found. Add entry and first item.
			loopOrderNumber = currentRow.orderNumber;
			
			var currentDate = dateValue.validateDate(currentIndex, currentRow, "ORDERDATE", fullResultObj);
			var currentOrderAdd = handleOrderAdd(currentIndex, currentRow, currentDate, fullResultObj);
			currentLineAllowed = checkAdd(currentOrderAdd, fullResultObj.data.orderEntries.length);
			currentLineAdd = handleItemAdd(currentIndex, currentRow, currentQuantity, currentPrice, fullResultObj, currentLineAllowed);
			currentRowComplete = checkAdd(currentLineAdd, fullResultObj.data.orderItems.length);
		}
		else
		{
			// Skip without error.
			currentRowComplete = true;
		}
		
		
		if (!currentRowComplete)
		{
			// Stop reading.
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex += 1;
	}
}


// Quantity Ordered.
function handleQuantityValidation(rowIndex, rowObject, fullResult)
{
	return numberValue.validateWhole(rowIndex, rowObject, "QUANTITYORDERED", valueLimits.orderQuantity, valueDefaults.quantityOrdered, false, fullResult);
}


// Price Each.
function handlePriceValidation(rowIndex, rowObject, quantityValue, fullResult)
{
	var quantityValid = Number.isInteger(quantityValue);
	var handleRes = -1;
	
	if (quantityValid)
	{
		// Validate price.
		handleRes = numberValue.validateDecimal(rowIndex, rowObject, "PRICEEACH", valueLimits.currency, valueDefaults.priceEach, true, fullResult);
	}
	
	return handleRes;
}


// Add new order entry.
function handleOrderAdd(rowIndex, rowObject, orderDateValidation, fullResult)
{
	var handleRes = -1;
	
	if (orderDateValidation.valid)
	{
		var custValue = rowObject.customerNumber;
		var dateValue = orderDateValidation.dateObject;
		var statusValue = rowObject.statusNumber;
		
		handleRes = orderDetails.addEntry(rowObject.orderNumber, custValue, dateValue, statusValue, fullResult.data.orderEntries);
	}
	
	return handleRes;
}


// Add new order item.
function handleItemAdd(rowIndex, rowObject, quantityValue, priceValue, fullResult, allowAdd)
{
	var handleRes = -1;
	
	if (allowAdd)
	{
		// Parent entry exists.
		var orderValue = rowObject.orderNumber;
		var lineValue = rowObject.lineNumber;
		var productValue = rowObject.productNumber;
		var dealValue = rowObject.dealSizeNumber;
		
		handleRes = orderDetails.addItem(orderValue, lineValue, productValue, quantityValue, priceValue, dealValue, rowIndex, fullResult.data.orderItems);
	}
	
	return handleRes;
}


// Checks if a data object was added successfully.
function checkAdd(addNum, arrLength)
{
	return (addNum > 0 && addNum <= arrLength);
}



module.exports =
{
	loopRows: loopDataRows
};