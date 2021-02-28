const valueLimits = require("../../common/value-limits");
const listItem = require("./field-validation/list-item");
const countryItem = require("./field-validation/country-item");
const subLocation = require("./field-validation/sub-location");
const stringValue = require("./field-validation/string-value");

function loopDataRows(origData, fullResultObj)
{
	var rowLoopIndex = 0;
	var currentRowObject = {};
	var currentTerritory = -1;
	var currentCountry = -1;
	var currentState = -1;
	var currentCity = -1;
	var currentDealSize = -1;
	var currentProductLine = -1;
	var currentOrderStatus = -1;
	var currentRowComplete = false;
	
	while (rowLoopIndex >= 0 && rowLoopIndex < origData.length && fullResultObj.canContinue === true)
	{
		currentRowObject = origData[rowLoopIndex];
		currentTerritory = -1;
		currentCountry = -1;
		currentState = -1;
		currentCity = -1;
		currentDealSize = -1;
		currentProductLine = -1;
		currentOrderStatus = -1;
		currentRowComplete = false;
		
		currentTerritory = handleTerritoryNormalization(rowLoopIndex, currentRowObject, fullResultObj);
		currentCountry = handleCountryNormalization(rowLoopIndex, currentRowObject, currentTerritory, fullResultObj);
		currentState = handleStateNormalization(rowLoopIndex, currentRowObject, currentCountry, fullResultObj);
		currentCity = handleCityNormalization(rowLoopIndex, currentRowObject, currentState, fullResultObj);
		currentDealSize = handleDealSizeNormalization(rowLoopIndex, currentRowObject, currentCity, fullResultObj);
		currentProductLine = handleProductLineNormalization(rowLoopIndex, currentRowObject, currentDealSize, fullResultObj);
		currentOrderStatus = handleOrderStatusNormalization(rowLoopIndex, currentRowObject, currentProductLine, fullResultObj);
		
		if (currentOrderStatus > 0 && currentOrderStatus <= fullResultObj.data.orderStatusModes.length)
		{
			currentRowComplete = true;
		}
		
		
		if (currentRowComplete !== true)
		{
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex = rowLoopIndex + 1;
	}
}



function handleTerritoryNormalization(rowIndex, rowObject, fullResult)
{
	var stringObject = stringValue.validateString(rowIndex, rowObject, "TERRITORY", valueLimits.territory, true, fullResult);
	var handleRes = -1;
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "territories", fullResult);
	}
	
	return handleRes;
}


function handleCountryNormalization(rowIndex, rowObject, territoryValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (territoryValue > 0 && territoryValue <= fullResult.data.territories.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "COUNTRY", valueLimits.country, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = countryItem.addCountry(stringObject.preparedText, fullResult.data.countries, territoryValue);
	}
	
	return handleRes;
}


function handleStateNormalization(rowIndex, rowObject, countryValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (countryValue > 0 && countryValue <= fullResult.data.countries.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "STATE", valueLimits.state, false, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = subLocation.addLocation(stringObject.preparedText, "statesRegions", countryValue, fullResult);
	}
	
	return handleRes;
}


function handleCityNormalization(rowIndex, rowObject, stateRegionValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (stateRegionValue > 0 && stateRegionValue <= fullResult.data.statesRegions.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "CITY", valueLimits.city, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = subLocation.addLocation(stringObject.preparedText, "cities", stateRegionValue, fullResult);
	}
	
	return handleRes;
}


function handleDealSizeNormalization(rowIndex, rowObject, cityValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (cityValue > 0 && cityValue <= fullResult.data.cities.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "DEALSIZE", valueLimits.dealSize, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "dealSizes", fullResult);
	}
	
	return handleRes;
}


function handleProductLineNormalization(rowIndex, rowObject, dealSizeValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (dealSizeValue > 0 && dealSizeValue <= fullResult.data.dealSizes.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "PRODUCTLINE", valueLimits.productLine, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "productLines", fullResult);
	}
	
	return handleRes;
}


function handleOrderStatusNormalization(rowIndex, rowObject, productLineValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (productLineValue > 0 && productLineValue <= fullResult.data.productLines.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "STATUS", valueLimits.orderStatus, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "orderStatusModes", fullResult);
	}
	
	return handleRes;
}


module.exports =
{
	loopRows: loopDataRows
};