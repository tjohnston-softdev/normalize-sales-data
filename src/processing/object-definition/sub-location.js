/*
	Adds or retrieves 'list items' from normalized data set.
	This covers the 'StateRegion' and 'City' tables.
	[id, name, parent]
*/


const valuePrep = require("../../common/value-prep");


function addLocationItem(locationString, arrName, targetParentID, fullRes)
{
	var arrObj = [];
	var preparedItem = "";
	
	var existingIndex = 0;
	var currentLocationObject = [];
	var currentLocationName = "";
	var currentParentString = "";
	var currentParentID = -1;
	var existID = null;
	
	var addRes = -1;
	var newLocationObject = [];
	
	
	// Reads location array and prepares target name.
	arrObj = fullRes.data[arrName];
	preparedItem = valuePrep.sanitizeString(locationString);
	
	
	// Loop existing location objects until end reached or target name found.
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		// Read current location.
		currentLocationObject = arrObj[existingIndex];
		currentLocationName = currentLocationObject[2];
		currentParentString = currentLocationObject[1];
		currentParentID = Number(currentParentString);
		
		
		if (currentLocationName.toLowerCase() === preparedItem.toLowerCase() && currentParentID === targetParentID)
		{
			// Names and parent IDs match.
			existID = currentLocationObject[0]
		}
		
		existingIndex = existingIndex + 1;
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