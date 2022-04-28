// This file converts a date object into a string. (eg. 2021-03-21)

function writeString(dateObj)
{	
	var yearNumber = dateObj.getFullYear();
	var monthNumber = dateObj.getMonth() + 1;
	var dayNumber = dateObj.getDate();
	
	var yearString = String(yearNumber);
	var monthString = formatDateNumber(monthNumber);
	var dayString = formatDateNumber(dayNumber);
	
	return [yearString, monthString, dayString].join("-");
}



function formatDateNumber(origNum)
{
	var formatRes = "";
	
	if (origNum >= 10)
	{
		formatRes = String(origNum);
	}
	else
	{
		formatRes = "0" + origNum;
	}
	
	return formatRes;
}



module.exports =
{
	write: writeString
};