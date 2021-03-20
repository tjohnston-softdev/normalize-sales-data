const valuePrep = require("../../common/value-prep");


function addCustomerItem(nameObject, detailsObject, cityLocationID, customerArr)
{
	var preparedName = valuePrep.sanitizeString(nameObject.preparedText);
	
	var existingIndex = 0;
	var currentCustomerObject = [];
	var currentCustomerName = "";
	var existID = null;
	
	var addRes = -1;
	var newCustomerObject = [];
	
	while (existingIndex >= 0 && existingIndex < customerArr.length && existID === null)
	{
		currentCustomerObject = customerArr[existingIndex];
		currentCustomerName = currentCustomerObject[1];
		
		if (currentCustomerName.toLowerCase() === preparedName.toLowerCase())
		{
			existID = currentCustomerObject[0];
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
		
		newCustomerObject[0] = String(addRes);
		newCustomerObject[1] = preparedName;
		newCustomerObject[2] = detailsObject.prepPhone;
		newCustomerObject[3] = detailsObject.prepFirstName;
		newCustomerObject[4] = detailsObject.prepLastName;
		newCustomerObject[5] = detailsObject.prepAddressLine1;
		newCustomerObject[6] = detailsObject.prepAddressLine2;
		newCustomerObject[7] = String(cityLocationID);
		newCustomerObject[8] = detailsObject.prepPostalCode;
		
		customerArr.push(newCustomerObject);
	}
	
	return addRes;
}




module.exports =
{
	addCustomer: addCustomerItem
};