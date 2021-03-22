/*
	Adds or retrieves product item objects.
	[id, code, line, msrp]
*/


const valuePrep = require("../../common/value-prep");


function addProductItem(productCodeString, msrpNum, lineID, productArr)
{
	var preparedCode = "";
	
	var existingIndex = 0;
	var currentProductObject = [];
	var currentProductCode = "";
	var existID = null;
	
	var addRes = -1;
	var newProductObject = [];
	
	
	// Prepare target product code.
	preparedCode = valuePrep.sanitizeString(productCodeString);
	
	
	// Loop products until end reached or target code found.
	while (existingIndex >= 0 && existingIndex < productArr.length && existID === null)
	{
		// Read current product.
		currentProductObject = productArr[existingIndex];
		currentProductCode = currentProductObject[1];
		
		if (currentProductCode.toLowerCase() === preparedCode.toLowerCase())
		{
			// Match found.
			existID = currentProductObject[0];
		}
		
		existingIndex = existingIndex + 1;
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