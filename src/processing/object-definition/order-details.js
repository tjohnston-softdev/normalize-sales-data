/*
	Adds or retrieves order-related objects.
	OrderEntry: [number, customer, date, status]
	OrderItem: [orderNumber, itemNumber, product, quantity, price, dealSize, displayOrderNumber]
*/

const dateString = require("../../common/date-string");


// Order Entry.
function addOrderEntryRow(idNumber, ordCust, ordDate, ordStatus, orderArray)
{
	// Loop variables.
	var existingIndex = 0;
	var existFlag = -1;
	
	// Result variables.
	var addRes = -1;
	var newOrderObject = [];
	
	// Loop order entries until end reached or target number found.
	while (existingIndex >= 0 && existingIndex < orderArray.length && existFlag === -1)
	{
		// Read current order entry.
		var currentExistingObject = orderArray[existingIndex];
		var currentIdentificationString = currentExistingObject[0];
		var currentIdentificationNumber = Number(currentIdentificationString);
		
		// Check for match.
		if (currentIdentificationNumber === idNumber) existFlag = existingIndex;
		
		existingIndex += 1;
	}
	
	if (existFlag >= 0 && existFlag < orderArray.length)
	{
		// Order entry already exists.
		addRes = existFlag + 1;
	}
	else
	{
		// Create order entry.
		newOrderObject = [];
		
		newOrderObject[0] = String(idNumber);
		newOrderObject[1] = String(ordCust);
		newOrderObject[2] = dateString.writeString(ordDate);
		newOrderObject[3] = String(ordStatus);
		
		orderArray.push(newOrderObject);
		addRes = orderArray.length;
	}
	
	return addRes;
}


// Order Item.
function addOrderItemRow(parentID, childNumber, itemProd, itemQuantity, itemPrice, itemDeal, itemDisplay, orderItemArray)
{
	// Loop variables.
	var existingIndex = 0;
	var existFlag = -1;
	
	// Result variables.
	var addRes = -1;
	var newOrderItemObject = [];
	
	
	// Loop order items until end reached or target object found.
	while (existingIndex >= 0 && existingIndex < orderItemArray.length && existFlag === -1)
	{
		var currentExistingObject = orderItemArray[existingIndex];
		var currentParentString = currentExistingObject[0];
		var currentChildString = currentExistingObject[1];
		var currentParentNumber = Number(currentParentString);
		var currentChildNumber = Number(currentChildString);
		
		if (currentParentNumber === parentID && currentChildNumber === childNumber)
		{
			// Item found.
			existFlag = existingIndex;
		}
		
		existingIndex += 1;
	}
	
	if (existFlag >= 0 && existFlag < orderItemArray.length)
	{
		// Item already exists.
		addRes = existFlag + 1;
	}
	else
	{
		// Create new item.
		newOrderItemObject = [];
		
		newOrderItemObject[0] = String(parentID);
		newOrderItemObject[1] = String(childNumber);
		newOrderItemObject[2] = String(itemProd);
		newOrderItemObject[3] = String(itemQuantity);
		newOrderItemObject[4] = String(itemPrice);
		newOrderItemObject[5] = String(itemDeal);
		newOrderItemObject[6] = String(itemDisplay);
		
		orderItemArray.push(newOrderItemObject);
		addRes = orderItemArray.length;
	}
	
	return addRes;
}



module.exports =
{
	addEntry: addOrderEntryRow,
	addItem: addOrderItemRow
};