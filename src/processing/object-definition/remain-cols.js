function compileRemainingColumnData(rowInd, origRowObject, orderID, lineNum, statusID, productID, customerID, dealSizeID)
{
	var localQuantity = origRowObject["QUANTITYORDERED"];
	var localPriceEach = origRowObject["PRICEEACH"];
	var localDate = origRowObject["ORDERDATE"];
	
	var compileRes = {};
	
	compileRes["originalIndex"] = rowInd;
	
	compileRes["QUANTITYORDERED"] = localQuantity;
	compileRes["PRICEEACH"] = localPriceEach;
	compileRes["ORDERDATE"] = localDate;
	
	compileRes["orderNumber"] = orderID;
	compileRes["lineNumber"] = lineNum;
	compileRes["statusNumber"] = statusID;
	compileRes["productNumber"] = productID;
	compileRes["customerNumber"] = customerID;
	compileRes["dealSizeNumber"] = dealSizeID;
	
	return compileRes;
}


module.exports =
{
	compileData: compileRemainingColumnData
};