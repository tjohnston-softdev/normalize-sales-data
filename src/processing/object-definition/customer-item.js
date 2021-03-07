const valuePrep = require("../../common/value-prep");


function addCustomerItem(nameObject, detailsObject, cityLocationID, customerArr)
{
	var preparedName = valuePrep.sanitizeString(nameObject.preparedText);
	
	var existingIndex = 0;
	var currentCustomerObject = {};
	var currentCustomerName = "";
	var existID = null;
	
	var addRes = -1;
	var newCustomerObject = {};
	
	while (existingIndex >= 0 && existingIndex < customerArr.length && existID === null)
	{
		currentCustomerObject = customerArr[existingIndex];
		currentCustomerName = currentCustomerObject.custName;
		
		if (currentCustomerName.toLowerCase() === preparedName.toLowerCase())
		{
			existID = currentCustomerObject.custNumber;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existID !== null)
	{
		addRes = Number(existID);
	}
	else
	{
		addRes = customerArr.length + 1;
		
		newCustomerObject["custNumber"] = String(addRes);
		newCustomerObject["custName"] = preparedName;
		newCustomerObject["phone"] = detailsObject.prepPhone;
		newCustomerObject["firstName"] = detailsObject.prepFirstName;
		newCustomerObject["lastName"] = detailsObject.prepLastName;
		newCustomerObject["address1"] = detailsObject.prepAddressLine1;
		newCustomerObject["address2"] = detailsObject.prepAddressLine2;
		newCustomerObject["city"] = String(cityLocationID);
		newCustomerObject["postal"] = detailsObject.prepPostalCode;
		
		customerArr.push(newCustomerObject);
	}
	
	return addRes;
}




module.exports =
{
	addCustomer: addCustomerItem
};