const valuePrep = require("../../common/value-prep");


function addProductItem(productCodeString, msrpNum, lineID, productArr)
{
	var preparedCode = valuePrep.sanitizeString(productCodeString);
	
	var existingIndex = 0;
	var currentProductObject = [];
	var currentProductCode = "";
	var existID = null;
	
	var addRes = -1;
	var newProductObject = [];
	
	while (existingIndex >= 0 && existingIndex < productArr.length && existID === null)
	{
		currentProductObject = productArr[existingIndex];
		currentProductCode = currentProductObject[1];
		
		if (currentProductCode.toLowerCase() === preparedCode.toLowerCase())
		{
			existID = currentProductObject[0];
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existID !== null)
	{
		addRes = Number(existID);
	}
	else
	{
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