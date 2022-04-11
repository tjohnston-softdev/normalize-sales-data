// Used to define file names, table names, and attribute lists for output data.

const path = require("path");


// Main function.
function getFileExportSpecification(targetFolder, chosenExt, inclAttrs)
{
	var specRes = {};
	
	// Creates specification object for each database table.
	specRes["territories"] = defineFileSpecification(targetFolder, "global-territory", chosenExt, "GlobalTerritory");
	specRes["countries"] = defineFileSpecification(targetFolder, "country", chosenExt, "Country");
	specRes["statesRegions"] = defineFileSpecification(targetFolder, "state-region", chosenExt, "StateRegion");
	specRes["cities"] = defineFileSpecification(targetFolder, "city", chosenExt, "City");
	specRes["dealSizes"] = defineFileSpecification(targetFolder, "deal-size", chosenExt, "DealSize");
	specRes["productLines"] = defineFileSpecification(targetFolder, "product-line", chosenExt, "ProductLine");
	specRes["orderStatusModes"] = defineFileSpecification(targetFolder, "order-status", chosenExt, "OrderStatus");
	specRes["products"] = defineFileSpecification(targetFolder, "product", chosenExt, "Product");
	specRes["customers"] = defineFileSpecification(targetFolder, "customer", chosenExt, "Customer");
	specRes["orderEntries"] = defineFileSpecification(targetFolder, "order-entry", chosenExt, "OrderEntry");
	specRes["orderItems"] = defineFileSpecification(targetFolder, "order-item", chosenExt, "OrderItem");
	
	
	// Includes table attributes for CSV files.
	if (inclAttrs)
	{
		specRes.territories.tableAttributes = ["territoryID", "territoryName"];
		specRes.countries.tableAttributes = ["countryID", "countryName", "territoryID"];
		specRes.statesRegions.tableAttributes = ["stateID", "countryID", "stateName"];
		specRes.cities.tableAttributes = ["cityID", "stateID", "cityName"];
		specRes.dealSizes.tableAttributes = ["dealSizeID", "dealSizeName"];
		specRes.productLines.tableAttributes = ["productLineID", "productLineName"];
		specRes.orderStatusModes.tableAttributes = ["statusID", "statusName"];
		specRes.products.tableAttributes = ["productID", "productCode", "productLineID", "msrp"];
		specRes.customers.tableAttributes = getCustomerAttributes();
		specRes.orderEntries.tableAttributes = ["orderID", "customerID", "orderDate", "statusID"];
		specRes.orderItems.tableAttributes = getOrderItemAttributes();
	}
	
	
	return specRes;
}



// Creates specification object.
function defineFileSpecification(tgtFolder, fileName, fileExt, tblName)
{
	var fullName = fileName + "." + fileExt;
	var defineRes = {};
	
	defineRes["filePath"] = path.join(tgtFolder, fullName);
	defineRes["tableName"] = tblName;
	defineRes["tableAttributes"] = [];
	
	return defineRes;
}


// 'Customer' table attributes.
function getCustomerAttributes()
{
	var attrList = [];
	
	attrList.push("customerID", "customerName", "phoneNumber", "contactFirstName", "contactLastName");
	attrList.push("addressLine1", "addressLine2", "cityID", "postalCode");
	
	return attrList;
}


// 'OrderItem' table attributes.
function getOrderItemAttributes()
{
	var attrList = [];
	
	attrList.push("orderID", "itemNumber", "productID");
	attrList.push("quantityOrdered", "priceEach", "dealSizeID", "displayNumber");
	
	return attrList;
}



module.exports =
{
	getFileSpecifications: getFileExportSpecification
};