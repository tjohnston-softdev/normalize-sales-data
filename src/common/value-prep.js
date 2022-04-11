// Functions for value preperation.


// Object type.
function checkObjectType(subjectVal)
{
	return (subjectVal !== undefined && subjectVal !== null && typeof subjectVal === "object");
}


// String type.
function checkStringType(subjectVal)
{
	return (typeof subjectVal === "string");
}


// Sanitize string.
function sanitizeInputString(subjectString)
{
	return subjectString.trim().replace(/\s+/g, " ");
}


module.exports =
{
	checkObject: checkObjectType,
	checkString: checkStringType,
	sanitizeString: sanitizeInputString
};