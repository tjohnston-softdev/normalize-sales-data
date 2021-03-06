function addOrderEntryRow(idNumber, ordCust, ordDate, ordStatus, orderArray)
{
	var existingIndex = 0;
	var currentExistingObject = {};
	var existFlag = -1;
	
	var addRes = -1;
	var newOrderObject = {};
	
	while (existingIndex >= 0 && existingIndex < orderArray.length && existFlag === -1)
	{
		currentExistingObject = orderArray[existingIndex];
		
		if (currentExistingObject.identificationNumber === idNumber)
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
		
		newOrderObject["identificationNumber"] = idNumber;
		newOrderObject["customer"] = ordCust;
		newOrderObject["date"] = ordDate;
		newOrderObject["statusCode"] = ordStatus;
		
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
		currentParent = currentExistingObject.orderEntryNumber;
		currentChild = currentExistingObject.orderLineNumber;
		
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
		
		newOrderItemObject["orderEntryNumber"] = parentID;
		newOrderItemObject["orderLineNumber"] = childNumber;
		newOrderItemObject["product"] = itemProd;
		newOrderItemObject["quantity"] = itemQuantity;
		newOrderItemObject["individualPrice"] = itemPrice;
		newOrderItemObject["deal"] = itemDeal;
		
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