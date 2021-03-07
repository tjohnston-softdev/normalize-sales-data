const dateString = require("../../common/date-string");

function addOrderEntryRow(idNumber, ordCust, ordDate, ordStatus, orderArray)
{
	var existingIndex = 0;
	var currentExistingObject = {};
	var currentIdentificationNumber = -1;
	var existFlag = -1;
	
	var addRes = -1;
	var newOrderObject = {};
	
	while (existingIndex >= 0 && existingIndex < orderArray.length && existFlag === -1)
	{
		currentExistingObject = orderArray[existingIndex];
		currentIdentificationNumber = Number(currentExistingObject.identificationNumber);
		
		if (currentIdentificationNumber === idNumber)
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existFlag >= 0 && existFlag < orderArray.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		newOrderObject = {};
		
		newOrderObject["identificationNumber"] = String(idNumber);
		newOrderObject["customer"] = String(ordCust);
		newOrderObject["date"] = dateString.writeString(ordDate);
		newOrderObject["statusCode"] = String(ordStatus);
		
		orderArray.push(newOrderObject);
		addRes = orderArray.length;
	}
	
	return addRes;
}


function addOrderItemRow(parentID, childNumber, itemProd, itemQuantity, itemPrice, itemDeal, orderItemArray)
{
	var existingIndex = 0;
	var currentExistingObject = {};
	var currentParent = -1;
	var currentChild = -1;
	var existFlag = -1;
	
	var addRes = -1;
	var newOrderItemObject = {};
	
	while (existingIndex >= 0 && existingIndex < orderItemArray.length && existFlag === -1)
	{
		currentExistingObject = orderItemArray[existingIndex];
		currentParent = Number(currentExistingObject.orderEntryNumber);
		currentChild = Number(currentExistingObject.orderLineNumber);
		
		if (currentParent === parentID && currentChild === childNumber)
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existFlag >= 0 && existFlag < orderItemArray.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		newOrderItemObject = {};
		
		newOrderItemObject["orderEntryNumber"] = String(parentID);
		newOrderItemObject["orderLineNumber"] = String(childNumber);
		newOrderItemObject["product"] = String(itemProd);
		newOrderItemObject["quantity"] = String(itemQuantity);
		newOrderItemObject["individualPrice"] = String(itemPrice);
		newOrderItemObject["deal"] = String(itemDeal);
		
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