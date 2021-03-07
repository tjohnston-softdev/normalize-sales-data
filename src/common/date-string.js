function writeDateStringFromObject(dateObj)
{
	var yearNumber = dateObj.getFullYear();
	var monthNumber = dateObj.getMonth() + 1;
	var dayNumber = dateObj.getDate();
	
	var yearString = String(yearNumber);
	var monthString = formatDateNumber(monthNumber);
	var dayString = formatDateNumber(dayNumber);
	
	var writeRes = [yearString, monthString, dayString].join("-");
	return writeRes;
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
	writeString: writeDateStringFromObject
};