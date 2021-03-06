function sortDataRows(origData)
{
	origData.sort(function (a, b)
	{
		return a.orderNumber - b.orderNumber || a.lineNumber - b.lineNumber;
	});
}


module.exports =
{
	sortRows: sortDataRows
};