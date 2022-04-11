/*
	Adds or retrieves product item objects.
	[id, code, line, msrp]
*/


const valuePrep = require("../../common/value-prep");


function addProductItem(productCodeString, msrpNum, lineID, productArr)
{
	// Prepare target product code.
	var preparedCode = valuePrep.sanitizeString(productCodeString);
	
	// Loop variables.
	var existingIndex = 0;
	var existID = null;
	
	// Result variables.
	var addRes = -1;
	var newProductObject = [];
	
	
	// Loop products until end reached or target code found.
	while (existingIndex >= 0 && existingIndex < productArr.length && existID === null)
	{
		// Read current product.
		var currentProductObject = productArr[existingIndex];
		var currentProductCode = currentProductObject[1].toLowerCase();
		
		// Check if match found.
		if (preparedCode.toLowerCase() === currentProductCode) existID = currentProductObject[0];
		
		existingIndex += 1;
	}
	
	if (existID !== null)
	{
		// Use existing product.
		addRes = Number(existID);
	}
	else
	{
		// Create new product.
		addRes = productArr.length + 1;
		newProductObject = [];
		
		newProductObject[0] = String(addRes);
		newProductObject[1] = preparedCode;
		newProductObject[2] = String(lineID);
		newProductObject[3] = String(msrpNum);
		
		productArr.push(newProductObject);
	}
	
	return addRes;
}


module.exports =
{
	addItem: addProductItem
};