const valuePrep = require("../../common/value-prep");

function addListItem(itemString, arrName, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(itemString);
	
	var existingIndex = 0;
	var currentExistingItem = [];
	var currentName = "";
	var existID = null;
	
	var addRes = -1;
	var newItemObject = [];
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		currentExistingItem = arrObj[existingIndex];
		currentName = currentExistingItem[1];
		
		if (currentName.toLowerCase() === preparedItem.toLowerCase())
		{
			existID = currentExistingItem[0];
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existID !== null)
	{
		addRes = Number(existID);
	}
	else
	{
		addRes = arrObj.length + 1;
		newItemObject = [];
		
		newItemObject[0] = String(addRes);
		newItemObject[1] = preparedItem;
		
		arrObj.push(newItemObject);
	}
	
	return addRes;
}



module.exports =
{
	addItem: addListItem
};