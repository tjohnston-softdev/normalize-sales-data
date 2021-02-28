function compileRemainingColumnData(origRowObject, statusID, productID, customerID, dealSizeID)
{
	var localOrderNumber = origRowObject["ORDERNUMBER"];
	var localQuantity = origRowObject["QUANTITYORDERED"];
	var localPriceEach = origRowObject["PRICEEACH"];
	var localLineNumber = origRowObject["ORDERLINENUMBER"];
	var localDate = origRowObject["ORDERDATE"];
	
	var compileRes = {};
	
	compileRes["orderNumCol"] = localOrderNumber;
	compileRes["quantityCol"] = localQuantity;
	compileRes["priceCol"] = localPriceEach;
	compileRes["lineCol"] = localLineNumber;
	compileRes["orderDateCol"] = localDate;
	
	compileRes["statusNumber"] = statusID;
	compileRes["productNumber"] = productID;
	compileRes["customerNumber"] = customerID;
	compileRes["dealSizeNumber"] = dealSizeID;
	
	return compileRes;
}


module.exports =
{
	compileRemainingColumns: compileRemainingColumnData
};