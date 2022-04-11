// Supported data output types.

const typeModes =
{
	"SQL": 1,
	"CSV": 2,
	"ARRAY": 3,
	"OBJECT": 4
};

// Saved entry flag.
var enteredType = -1;


// Retrieve mode array as a string. Used for error messages.
function getModesListText()
{
	var propArr = [];
	
	// Loop properties.
	for (var currentProp in typeModes)
	{
		var currentLower = currentProp.toLowerCase();
		propArr.push(currentLower);
	}
	
	// Write final string.
	return "[" + propArr.join(", ") + "]";
}


// Set input flag.
function saveEntryFlag(flagVal)
{
	enteredType = flagVal;
}

// Get input flag.
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