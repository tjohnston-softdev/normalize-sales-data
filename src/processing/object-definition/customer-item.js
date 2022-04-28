/*
	Adds or retrieves customer items.
	[id, name, phone, first, last, address1, address2, city, postal]
*/


const valuePrep = require("../../common/value-prep");


function addCustomerItem(nameObject, detailsObject, cityLocationID, customerArr)
{
	var preparedName = valuePrep.sanitizeString(nameObject.preparedText);
	
	var existingIndex = 0;
	var existID = null;
	
	var addRes = -1;
	var newCustomerObject = [];
	
	
	// Loop existing country objects until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < customerArr.length && existID === null)
	{
		var currentCustomerObject = customerArr[existingIndex];
		var currentCustomerName = currentCustomerObject[1].toLowerCase();
		
		if (preparedName.toLowerCase() === currentCustomerName) existID = currentCustomerObject[0];
		
		existingIndex += 1;
	}
	
	if (existID !== null)
	{
		// Use existing customer.
		addRes = Number(existID);
	}
	else
	{
		// Add new customer.
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