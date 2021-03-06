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
		
		if (currentExistingObject.aaa === idNumber)
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



module.exports =
{
	addOrderEntry: addOrderEntryRow
};