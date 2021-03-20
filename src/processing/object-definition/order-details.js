const dateString = require("../../common/date-string");

function addOrderEntryRow(idNumber, ordCust, ordDate, ordStatus, orderArray)
{
	var existingIndex = 0;
	var currentExistingObject = [];
	var currentIdentificationString = "";
	var currentIdentificationNumber = -1;
	var existFlag = -1;
	
	var addRes = -1;
	var newOrderObject = [];
	
	while (existingIndex >= 0 && existingIndex < orderArray.length && existFlag === -1)
	{
		currentExistingObject = orderArray[existingIndex];
		currentIdentificationString = currentExistingObject[0];
		currentIdentificationNumber = Number(currentIdentificationString);
		
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


function addOrderItemRow(parentID, childNumber, itemProd, itemQuantity, itemPrice, itemDeal, itemDisplay, orderItemArray)
{
	var existingIndex = 0;
	var currentExistingObject = [];
	var currentParentString = "";
	var currentChildString = "";
	var currentParentNumber = -1;
	var currentChildNumber = -1;
	var existFlag = -1;
	
	var addRes = -1;
	var newOrderItemObject = [];
	
	while (existingIndex >= 0 && existingIndex < orderItemArray.length && existFlag === -1)
	{
		currentExistingObject = orderItemArray[existingIndex];
		currentParentString = currentExistingObject[0];
		currentChildString = currentExistingObject[1];
		currentParentNumber = Number(currentParentString);
		currentChildNumber = Number(currentChildString);
		
		if (currentParentNumber === parentID && currentChildNumber === childNumber)
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