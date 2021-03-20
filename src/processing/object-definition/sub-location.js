const valuePrep = require("../../common/value-prep");


function addLocationItem(locationString, arrName, targetParentID, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(locationString);
	
	var existingIndex = 0;
	var currentLocationObject = [];
	var currentLocationName = "";
	var currentParentString = "";
	var currentParentID = -1;
	var existID = null;
	
	var addRes = -1;
	var newLocationObject = [];
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existID === null)
	{
		currentLocationObject = arrObj[existingIndex];
		currentLocationName = currentLocationObject[2];
		currentParentString = currentLocationObject[1];
		currentParentID = Number(currentParentString);
		
		if (currentLocationName.toLowerCase() === preparedItem.toLowerCase() && currentParentID === targetParentID)
		{
			existID = currentLocationObject[0]
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