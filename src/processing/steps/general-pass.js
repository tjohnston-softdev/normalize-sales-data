const valueLimits = require("../../common/value-limits");
const listItem = require("./field-validation/list-item");
const countryItem = require("./field-validation/country-item");
const subLocation = require("./field-validation/sub-location");

function loopDataRows(origData, fullResult)
{
	var rowIndex = 0;
	var currentRowObject = {};
	var currentTerritory = -1;
	var currentCountry = -1;
	var currentState = -1;
	var currentCity = -1;
	var currentRowComplete = false;
	
	while (rowIndex >= 0 && rowIndex < origData.length && fullResult.canContinue === true)
	{
		currentRowObject = origData[rowIndex];
		currentTerritory = listItem.validateItem(rowIndex, currentRowObject, "TERRITORY", valueLimits.territory, "territories", fullResult);
		currentCountry = -1;
		currentState = -1;
		currentCity = -1;
		currentRowComplete = false;
		
		if (currentTerritory > 0 && currentTerritory <= fullResult.data.territories.length)
		{
			currentCountry = countryItem.validateCountry(rowIndex, currentRowObject, currentTerritory, fullResult);
		}
		
		if (currentCountry > 0 && currentCountry <= fullResult.data.countries.length)
		{
			currentState = subLocation.validateLocation(rowIndex, currentRowObject, "STATE", valueLimits.state, "statesRegions", currentCountry, fullResult, false);
		}
		
		if (currentState > 0 && currentState <= fullResult.data.statesRegions.length)
		{
			currentCity = subLocation.validateLocation(rowIndex, currentRowObject, "CITY", valueLimits.city, "cities", currentState, fullResult, true);
		}
		
		if (currentCity > 0 && currentCity <= fullResult.data.cities.length)
		{
			currentRowComplete = true;
		}
		
		
		if (currentRowComplete !== true)
		{
			fullResult.canContinue = false;
		}
		
		rowIndex = rowIndex + 1;
	}
}



module.exports =
{
	loopRows: loopDataRows
};