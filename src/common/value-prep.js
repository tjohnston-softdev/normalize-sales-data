// Functions for value preperation.


// Object type.
function checkObjectType(subjectVal)
{
	var vType = typeof subjectVal;
	var checkRes = false;
	
	if (subjectVal !== undefined && subjectVal !== null && vType === "object")
	{
		checkRes = true;
	}
	
	return checkRes;
}


// String type.
function checkStringType(subjectVal)
{
	var vType = typeof subjectVal;
	var checkRes = false;
	
	if (vType === "string")
	{
		checkRes = true;
	}
	
	return checkRes;
}


// Sanitize string.
function sanitizeInputString(subjectString)
{
	var prepRes = subjectString;
	
	prepRes = prepRes.trim();
	prepRes = prepRes.replace(/\s+/g, " ");
	
	return prepRes;
}


module.exports =
{
	checkObject: checkObjectType,
	checkString: checkStringType,
	sanitizeString: sanitizeInputString
};