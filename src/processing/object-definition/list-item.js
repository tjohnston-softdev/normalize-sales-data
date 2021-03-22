/*
	Adds or retrieves 'list items' from normalized data set.
	This covers list tables with [id, name] columns.
	(eg. DealSize)
*/

const valuePrep = require("../../common/value-prep");


function addListItem(itemString, arrName, fullRes)
{
	var arrObj = [];
	var preparedItem = "";
	
	var existingIndex = 0;
	var currentExistingItem = [];
	var currentName = "";
	var existID = null;
	
	var addRes = -1;
	var newItemObject = [];
	
	// Reads list item array and prepares target name.
	arrObj = fullRes.data[arrName];
	preparedItem = valuePrep.sanitizeString(itemString);
	
	
	// Loop existing list entries until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		// Read current list item.
		currentExistingItem = arrObj[existingIndex];
		currentName = currentExistingItem[1];
				
		if (currentName.toLowerCase() === preparedItem.toLowerCase())
		{
			// Match found.
			existID = currentExistingItem[0];
		}
		
		existingIndex = existingIndex + 1;
	}
	
	
	if (existID !== null)
	{
		// Use existing list item.
		addRes = Number(existID);
	}
	else
	{
		// Create new list item.
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