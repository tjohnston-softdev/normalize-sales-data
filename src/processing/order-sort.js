function sortPreparedDataRows(origData, sortAllowed)
{
	if (sortAllowed === true)
	{
		performSorting(origData);
	}
}


function performSorting(rList)
{
	rList.sort(function (a, b)
	{
		return a.orderNumber - b.orderNumber || a.lineNumber - b.lineNumber;
	});
}


module.exports =
{
	sortRows: sortPreparedDataRows
};