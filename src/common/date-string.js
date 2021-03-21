// This file converts a date object into a string. (eg. 2021-03-21)


// Main function.
function writeDateStringFromObject(dateObj)
{
	var yearNumber = -1;
	var monthNumber = -1;
	var dayNumber = -1;
	
	var yearString = "";
	var monthString = "";
	var dayString = "";
	
	var writeRes = "";
	
	
	// Reads date numbers.
	yearNumber = dateObj.getFullYear();
	monthNumber = dateObj.getMonth() + 1;
	dayNumber = dateObj.getDate();
	
	// Casts to string.
	yearString = String(yearNumber);
	monthString = formatDateNumber(monthNumber);
	dayString = formatDateNumber(dayNumber);
	
	
	// Writes full date.
	writeRes = [yearString, monthString, dayString].join("-");
	return writeRes;
}



// Formats as two-digit number.
function formatDateNumber(origNum)
{
	var formatRes = "";
	
	if (origNum >= 10)
	{
		// Use as-is.
		formatRes = String(origNum);
	}
	else
	{
		// Add zero.
		formatRes = "0" + origNum;
	}
	
	return formatRes;
}



module.exports =
{
	writeString: writeDateStringFromObject
};