const typeModes =
{
	"SQL": 1,
	"CSV": 2,
	"ARRAY": 3,
	"OBJECT": 4
};

var enteredType = -1;


function getModesListText()
{
	var currentProp = "";
	var currentLower = "";
	var propArr = [];
	var textRes = "";
	
	for (currentProp in typeModes)
	{
		currentLower = currentProp.toLowerCase();
		propArr.push(currentLower);
	}
	
	textRes += "[";
	textRes += propArr.join(", ");
	textRes += "]";
	
	return textRes;
}


function saveEntryFlag(flagVal)
{
	enteredType = flagVal;
}

function getEntryFlag()
{
	return enteredType;
}


module.exports =
{
	modes: typeModes,
	getList: getModesListText,
	saveEntry: saveEntryFlag,
	getEntry: getEntryFlag
};