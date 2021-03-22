// This file is used to remove unnecessary data from CSV row objects after general pass.

function compileRemainingColumnData(rowInd, origRowObject, orderID, lineNum, statusID, productID, customerID, dealSizeID)
{
	// Read unnormalized column values.
	var localQuantity = origRowObject["QUANTITYORDERED"];
	var localPriceEach = origRowObject["PRICEEACH"];
	var localDate = origRowObject["ORDERDATE"];
	
	var compileRes = {};
	
	// Save original row index.
	compileRes["originalIndex"] = rowInd;
	
	// Save column values.
	compileRes["QUANTITYORDERED"] = localQuantity;
	compileRes["PRICEEACH"] = localPriceEach;
	compileRes["ORDERDATE"] = localDate;
	
	// Save Foreign Keys.
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