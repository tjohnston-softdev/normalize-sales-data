/*
	Adds or retrieves 'list items' from normalized data set.
	This covers list tables with [id, name] columns.
	(eg. DealSize)
*/

const valuePrep = require("../../common/value-prep");


function addListItem(itemString, arrName, fullRes)
{
	// Reads list item array and prepares target name.
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(itemString);
	
	// Loop variables.
	var existingIndex = 0;
	var existID = null;
	
	// Result variables.
	var addRes = -1;
	var newItemObject = [];
	
	
	// Loop existing list entries until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		// Read current list item.
		var currentExistingItem = arrObj[existingIndex];
		var currentName = currentExistingItem[1].toLowerCase();
		
		// Check for match.
		if (preparedItem.toLowerCase() === currentName) existID = currentExistingItem[0];
		
		existingIndex += 1;
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