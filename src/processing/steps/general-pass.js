const valueLimits = require("../../common/value-limits");
const listItem = require("./field-validation/list-item");

function loopDataRows(origData, fullResult)
{
	var rowIndex = 0;
	var currentRowObject = {};
	var currentTerritory = -1;
	var currentRowComplete = false;
	
	while (rowIndex >= 0 && rowIndex < origData.length && fullResult.canContinue === true)
	{
		currentRowObject = origData[rowIndex];
		currentTerritory = listItem.validateItem(rowIndex, currentRowObject, "TERRITORY", valueLimits.territory, "territories", fullResult);
		currentRowComplete = false;
		
		if (currentTerritory > 0 && currentTerritory <= fullResult.data.territories.length)
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