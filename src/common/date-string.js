// This file converts a date object into a string. (eg. 2021-03-21)

// Main function.
function writeDateStringFromObject(dateObj)
{	
	// Reads date numbers.
	var yearNumber = dateObj.getFullYear();
	var monthNumber = dateObj.getMonth() + 1;
	var dayNumber = dateObj.getDate();
	
	// Casts to string.
	var yearString = String(yearNumber);
	var monthString = formatDateNumber(monthNumber);
	var dayString = formatDateNumber(dayNumber);
	
	
	// Writes and returns full date.
	return [yearString, monthString, dayString].join("-");
}



// Formats as two-digit number.
function formatDateNumber(origNum)
{
	return (origNum >= 10) ? String(origNum) : ("0" + origNum)
}



module.exports =
{
	writeString: writeDateStringFromObject
};