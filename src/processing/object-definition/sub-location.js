/*
	Adds or retrieves 'list items' from normalized data set.
	This covers the 'StateRegion' and 'City' tables.
	[id, name, parent]
*/


const valuePrep = require("../../common/value-prep");


function addLocationItem(locationString, arrName, targetParentID, fullRes)
{
	// Reads location array and prepares target name.
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(locationString);
	
	// Loop variables.
	var existingIndex = 0;
	var existID = null;
	
	// Result variables.
	var addRes = -1;
	var newLocationObject = [];
	
	// Loop existing location objects until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		// Read current location.
		var currentLocationObject = arrObj[existingIndex];
		var currentLocationName = currentLocationObject[2].toLowerCase();
		var currentParentString = currentLocationObject[1];
		var currentParentID = Number(currentParentString);
		
		
		if (currentLocationName === preparedItem.toLowerCase() && currentParentID === targetParentID)
		{
			// Names and parent IDs match.
			existID = currentLocationObject[0]
		}
		
		existingIndex += 1;
	}
	
	if (existID !== null)
	{
		// Use existing location.
		addRes = Number(existID);
	}
	else
	{
		// Create new location.
		addRes = arrObj.length + 1;
		newLocationObject = [];
		
		newLocationObject[0] = String(addRes);
		newLocationObject[1] = String(targetParentID);
		newLocationObject[2] = preparedItem;
		
		arrObj.push(newLocationObject);
	}
	
	return addRes;
}



module.exports =
{
	addLocation: addLocationItem
};