const valuePrep = require("../../common/value-prep");


function addCustomerItem(nameObject, detailsObject, cityLocationID, customerArr)
{
	var preparedName = valuePrep.sanitizeString(nameObject.preparedText);
	
	var existingIndex = 0;
	var currentCustomerObject = {};
	var currentCustomerName = "";
	var existFlag = -1;
	
	var addRes = -1;
	var newCustomerObject = {};
	
	while (existingIndex >= 0 && existingIndex < customerArr.length && existFlag === -1)
	{
		currentCustomerObject = customerArr[existingIndex];
		currentCustomerName = currentCustomerObject.custName;
		
		if (currentCustomerName.toLowerCase() === preparedName.toLowerCase())
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existFlag >= 0 && existFlag < customerArr.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		newCustomerObject["custName"] = preparedName;
		newCustomerObject["phone"] = detailsObject.prepPhone;
		newCustomerObject["firstName"] = detailsObject.prepFirstName;
		newCustomerObject["lastName"] = detailsObject.prepLastName;
		newCustomerObject["address1"] = detailsObject.prepAddressLine1;
		newCustomerObject["address2"] = detailsObject.prepAddressLine2;
		newCustomerObject["city"] = cityLocationID;
		newCustomerObject["postal"] = detailsObject.prepPostalCode;
		
		customerArr.push(newCustomerObject);
		addRes = customerArr.length;
	}
	
	return addRes;
}




module.exports =
{
	addCustomer: addCustomerItem
};