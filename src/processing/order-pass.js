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
	var rowLoopIndex = 0;					// Sorted row index.
	var currentRow = {};					// Row object.
	var currentIndex = -1;					// Original row index.
	var currentQuantity = -1;				// Quantity ordered.
	var currentPrice = -1;					// Price each.
	var currentDate = {};					// Order date.
	var currentOrderAdd = -1;				// Order entry added flag.
	var currentLineAllowed = false;			// Order entry added boolean.
	var currentLineAdd = -1;				// Order item added flag.
	var currentRowComplete = false;			// Row valid.
	var loopOrderNumber = 0;				// Current order entry number.
	
	
	// Loop each row until end reached or error flagged.
	while (rowLoopIndex >= 0 && rowLoopIndex < prepData.length && fullResultObj.canContinue === true)
	{
		// Reads current row and resets locals.
		currentRow = prepData[rowLoopIndex];
		currentIndex = currentRow.originalIndex;
		currentQuantity = -1;
		currentPrice = -1;
		currentDate = {};
		currentOrderAdd = -1;
		currentLineAllowed = false;
		currentLineAdd = -1;
		currentRowComplete = false;
		
		// Validates the quantity and price, as they are common to both scenarios.
		currentQuantity = handleQuantityValidation(currentIndex, currentRow, fullResultObj);
		currentPrice = handlePriceValidation(currentIndex, currentRow, currentQuantity, fullResultObj);
		
		
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
			
			currentDate = dateValue.validateDate(currentIndex, currentRow, "ORDERDATE", fullResultObj);
			currentOrderAdd = handleOrderAdd(currentIndex, currentRow, currentDate, fullResultObj);
			currentLineAllowed = checkAdd(currentOrderAdd, fullResultObj.data.orderEntries.length);
			currentLineAdd = handleItemAdd(currentIndex, currentRow, currentQuantity, currentPrice, fullResultObj, currentLineAllowed);
			currentRowComplete = checkAdd(currentLineAdd, fullResultObj.data.orderItems.length);
		}
		else
		{
			// Skip without error.
			currentRowComplete = true;
		}
		
		
		if (currentRowComplete !== true)
		{
			// Stop reading.
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex = rowLoopIndex + 1;
	}
}


// Quantity Ordered.
function handleQuantityValidation(rowIndex, rowObject, fullResult)
{
	var handleRes = -1;
	handleRes = numberValue.validateWhole(rowIndex, rowObject, "QUANTITYORDERED", valueLimits.orderQuantity, valueDefaults.quantityOrdered, false, fullResult);
	return handleRes;
}


// Price Each.
function handlePriceValidation(rowIndex, rowObject, quantityValue, fullResult)
{
	var quantityValid = Number.isInteger(quantityValue);
	var handleRes = -1;
	
	if (quantityValid === true)
	{
		// Validate price.
		handleRes = numberValue.validateDecimal(rowIndex, rowObject, "PRICEEACH", valueLimits.currency, valueDefaults.priceEach, true, fullResult);
	}
	
	return handleRes;
}


// Add new order entry.
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


// Add new order item.
function handleItemAdd(rowIndex, rowObject, quantityValue, priceValue, fullResult, allowAdd)
{
	var pOrder = -1;
	var pLine = -1;
	var pProduct = -1;
	var pDeal = -1;
	
	var handleRes = -1;
	
	if (allowAdd === true)
	{
		// Parent entry exists.
		pOrder = rowObject.orderNumber;
		pLine = rowObject.lineNumber;
		pProduct = rowObject.productNumber;
		pDeal = rowObject.dealSizeNumber;
		
		handleRes = orderDetails.addItem(pOrder, pLine, pProduct, quantityValue, priceValue, pDeal, rowIndex, fullResult.data.orderItems);
	}
	
	return handleRes;
}


// Checks if a data object was added successfully.
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