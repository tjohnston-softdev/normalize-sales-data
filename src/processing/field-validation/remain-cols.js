function compileRemainingColumnData(origRowObject, orderID, lineNum, statusID, productID, customerID, dealSizeID)
{
	var localQuantity = origRowObject["QUANTITYORDERED"];
	var localPriceEach = origRowObject["PRICEEACH"];
	var localDate = origRowObject["ORDERDATE"];
	
	var compileRes = {};
	
	compileRes["quantityCol"] = localQuantity;
	compileRes["priceCol"] = localPriceEach;
	compileRes["orderDateCol"] = localDate;
	
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