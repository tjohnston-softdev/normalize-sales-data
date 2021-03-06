const valuePrep = require("../../common/value-prep");


function addLocationItem(locationString, arrName, targetParentID, fullRes)
{
	var arrObj = fullRes.data[arrName];
	var preparedItem = valuePrep.sanitizeString(locationString);
	
	var existingIndex = 0;
	var currentLocationObject = {};
	var currentLocationName = "";
	var currentParentID = -1;
	var existFlag = -1;
	
	var addRes = -1;
	var newLocationObject = {};
	
	while (existingIndex >= 0 && existingIndex < arrObj.length && existFlag === -1)
	{
		currentLocationObject = arrObj[existingIndex];
		currentLocationName = currentLocationObject.name;
		currentParentID = currentLocationObject.parentLocation;
		
		if (currentLocationName.toLowerCase() === preparedItem.toLowerCase() && currentParentID === targetParentID)
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
		newLocationObject = {"name": preparedItem, "parentLocation": targetParentID};
		arrObj.push(newLocationObject);
		addRes = arrObj.length;
	}
	
	return addRes;
}



module.exports =
{
	addLocation: addLocationItem
};