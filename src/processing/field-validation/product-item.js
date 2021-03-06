const valuePrep = require("../../common/value-prep");


function addProductItem(productCodeString, msrpNum, lineID, productArr)
{
	var preparedCode = valuePrep.sanitizeString(productCodeString);
	
	var existingIndex = 0;
	var currentProductObject = {};
	var currentProductCode = "";
	var existFlag = -1;
	
	var addRes = -1;
	var newProductObject = {};
	
	while (existingIndex >= 0 && existingIndex < productArr.length && existFlag === -1)
	{
		currentProductObject = productArr[existingIndex];
		currentProductCode = currentProductObject.code;
		
		if (currentProductCode.toLowerCase() === preparedCode.toLowerCase())
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existFlag >= 0 && existFlag < productArr.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		newProductObject = {"code": preparedCode, "line": lineID, "msrp": msrpNum};
		productArr.push(newProductObject);
		addRes = productArr.length;
	}
	
	return addRes;
}


module.exports =
{
	addItem: addProductItem
};