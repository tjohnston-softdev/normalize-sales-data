const valuePrep = require("../../common/value-prep");

function addListItem(itemString, arrName, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(itemString);
	
	var existingIndex = 0;
	var currentExistingItem = "";
	var existFlag = -1;
	
	var addRes = -1;
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existFlag === -1)
	{
		currentExistingItem = arrObj[existingIndex];
		
		if (currentExistingItem.toLowerCase() === preparedItem.toLowerCase())
		{
			existFlag = existingIndex;
		}
		
		existingIndex = existingIndex + 1;
	}
	
	if (existFlag >= 0 && existFlag < arrObj.length)
	{
		addRes = existFlag + 1;
	}
	else
	{
		arrObj.push(preparedItem);
		addRes = arrObj.length;
	}
	
	return addRes;
}



module.exports =
{
	addItem: addListItem
};