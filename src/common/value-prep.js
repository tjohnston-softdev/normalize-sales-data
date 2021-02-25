const leadingSpaceRegex = /\s+/g;

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


function sanitizeInputString(subjectString)
{
	var prepRes = subjectString;
	
	prepRes = prepRes.trim();
	prepRes = prepRes.replace(leadingSpaceRegex, " ");
	
	return prepRes;
}


module.exports =
{
	checkObject: checkObjectType,
	checkString: checkStringType,
	sanitizeString: sanitizeInputString
};