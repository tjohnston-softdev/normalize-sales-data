const valuePrep = require("../../common/value-prep");


function addLocationItem(locationString, arrName, targetParentID, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(locationString);
	
	var existingIndex = 0;
	var currentLocationObject = {};
	var currentLocationName = "";
	var currentParentID = -1;
	var existID = null;
	
	var addRes = -1;
	var newLocationObject = {};
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		currentLocationObject = arrObj[existingIndex];
		currentLocationName = currentLocationObject.name;
		currentParentID = Number(currentLocationObject.parentLocation);
		
		if (currentLocationName.toLowerCase() === preparedItem.toLowerCase() && currentParentID === targetParentID)
		{
			existID = currentLocationObject.locationID;
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
		newLocationObject = {};
		
		newLocationObject["locationID"] = String(addRes);
		newLocationObject["name"] = preparedItem;
		newLocationObject["parentLocation"] = String(targetParentID);
		
		arrObj.push(newLocationObject);
	}
	
	return addRes;
}



module.exports =
{
	addLocation: addLocationItem
};