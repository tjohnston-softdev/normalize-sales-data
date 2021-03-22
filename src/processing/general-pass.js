/*
	* This file is used to normalize general data that isn't directly related to orders.
	* The idea is to normalize as much data as possible in a single loop.
*/

const valueLimits = require("../common/value-limits");
const valueDefaults = require("../common/value-defaults");
const listItem = require("./object-definition/list-item");
const countryItem = require("./object-definition/country-item");
const subLocation = require("./object-definition/sub-location");
const productItem = require("./object-definition/product-item");
const customerItem = require("./object-definition/customer-item");
const stringValue = require("./field-validation/string-value");
const numberValue = require("./field-validation/number-value");
const remainCols = require("./object-definition/remain-cols");


// Main function.
function loopDataRows(origData, fullResultObj)
{
	var rowLoopIndex = 0;					// Row index.
	var currentRow = {};					// Row object.
	var currentTerritory = -1;				// Territory ID.
	var currentCountry = -1;				// Country ID.
	var currentState = -1;					// State-Region ID.
	var currentCity = -1;					// City ID
	var currentDeal = -1;					// Deal Size ID.
	var currentProductLine = -1;			// Product Line ID.
	var currentStatus = -1;					// Order Status ID.
	var currentProduct = -1;				// Product ID.
	var currentCustomerName = {};			// Customer name.
	var currentCustomerDetails = {};		// Customer details.
	var currentCustomerNumber = -1;			// Customer ID.
	var currentOrder = -1;					// Order number.
	var currentLine = -1;					// Order item number.
	var currentRowComplete = false;			// Row valid.
	var currentData = {};					// Remaining data object.
	
	
	// Loop each row until end reached or error flagged.
	while (rowLoopIndex >= 0 && rowLoopIndex < origData.length && fullResultObj.canContinue === true)
	{
		// Reads current row and resets locals.
		currentRow = origData[rowLoopIndex];
		currentTerritory = -1;
		currentCountry = -1;
		currentState = -1;
		currentCity = -1;
		currentDeal = -1;
		currentProductLine = -1;
		currentStatus = -1;
		currentProduct = -1;
		currentCustomerName = {};
		currentCustomerDetails = {};
		currentCustomerNumber = -1;
		currentOrder = -1;
		currentLine = -1;
		currentRowComplete = false;
		currentData = {};
		
		// Read, validate and normalize data sequentially.
		currentTerritory = handleTerritoryNormalization(rowLoopIndex, currentRow, fullResultObj);
		currentCountry = handleCountryNormalization(rowLoopIndex, currentRow, currentTerritory, fullResultObj);
		currentState = handleStateNormalization(rowLoopIndex, currentRow, currentCountry, fullResultObj);
		currentCity = handleCityNormalization(rowLoopIndex, currentRow, currentState, fullResultObj);
		currentDeal = handleDealSizeNormalization(rowLoopIndex, currentRow, currentCity, fullResultObj);
		currentProductLine = handleProductLineNormalization(rowLoopIndex, currentRow, currentDeal, fullResultObj);
		currentStatus = handleOrderStatusNormalization(rowLoopIndex, currentRow, currentProductLine, fullResultObj);
		currentProduct = handleProductItemNormalization(rowLoopIndex, currentRow, currentStatus, currentProductLine, fullResultObj);
		currentCustomerName = handleCustomerNameValidation(rowLoopIndex, currentRow, currentProduct, fullResultObj);
		currentCustomerDetails = handleCustomerDetailsValidation(rowLoopIndex, currentRow, currentCustomerName.valid, fullResultObj);
		currentCustomerNumber = handleCustomerNormalization(currentCustomerName, currentCustomerDetails, currentCity, fullResultObj);
		currentOrder = handleOrderNumberValidation(rowLoopIndex, currentRow, currentCustomerNumber, fullResultObj);
		currentLine = handleLineNumberValidation(rowLoopIndex, currentRow, currentOrder, fullResultObj);
		currentRowComplete = checkRowComplete(currentLine);
		currentData = {};
		
		
		if (currentRowComplete === true)
		{
			// Save normalized data.
			currentData = remainCols.compileData(rowLoopIndex, currentRow, currentOrder, currentLine, currentStatus, currentProduct, currentCustomerNumber, currentDeal);
			origData[rowLoopIndex] = currentData;
		}
		else
		{
			// Stop reading.
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex = rowLoopIndex + 1;
	}
}


// Territory.
function handleTerritoryNormalization(rowIndex, rowObject, fullResult)
{
	var stringObject = stringValue.validateString(rowIndex, rowObject, "TERRITORY", valueLimits.territory, true, fullResult);
	var handleRes = -1;
	
	if (stringObject.valid === true)
	{
		// Add territory.
		handleRes = listItem.addItem(stringObject.preparedText, "territories", fullResult);
	}
	
	return handleRes;
}


// Country.
function handleCountryNormalization(rowIndex, rowObject, territoryValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (territoryValue > 0 && territoryValue <= fullResult.data.territories.length)
	{
		// Territory exists - Validate country name.
		stringObject = stringValue.validateString(rowIndex, rowObject, "COUNTRY", valueLimits.country, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		// Add country.
		handleRes = countryItem.addCountry(stringObject.preparedText, fullResult.data.countries, territoryValue);
	}
	
	return handleRes;
}

// State-Region.
function handleStateNormalization(rowIndex, rowObject, countryValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (countryValue > 0 && countryValue <= fullResult.data.countries.length)
	{
		// Country exists - Validate region name.
		stringObject = stringValue.validateString(rowIndex, rowObject, "STATE", valueLimits.state, false, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		// Add region.
		handleRes = subLocation.addLocation(stringObject.preparedText, "statesRegions", countryValue, fullResult);
	}
	
	return handleRes;
}


// City.
function handleCityNormalization(rowIndex, rowObject, stateRegionValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (stateRegionValue > 0 && stateRegionValue <= fullResult.data.statesRegions.length)
	{
		// Region exists - Validate city name.
		stringObject = stringValue.validateString(rowIndex, rowObject, "CITY", valueLimits.city, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		// Add city.
		handleRes = subLocation.addLocation(stringObject.preparedText, "cities", stateRegionValue, fullResult);
	}
	
	return handleRes;
}


// Deal Size.
function handleDealSizeNormalization(rowIndex, rowObject, cityValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (cityValue > 0 && cityValue <= fullResult.data.cities.length)
	{
		// City exists - Validate deal size name.
		stringObject = stringValue.validateString(rowIndex, rowObject, "DEALSIZE", valueLimits.dealSize, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		// Add deal size.
		handleRes = listItem.addItem(stringObject.preparedText, "dealSizes", fullResult);
	}
	
	return handleRes;
}


// Product Line.
function handleProductLineNormalization(rowIndex, rowObject, dealSizeValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (dealSizeValue > 0 && dealSizeValue <= fullResult.data.dealSizes.length)
	{
		// Deal size exists - Validate product line name.
		stringObject = stringValue.validateString(rowIndex, rowObject, "PRODUCTLINE", valueLimits.productLine, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		// Add product line.
		handleRes = listItem.addItem(stringObject.preparedText, "productLines", fullResult);
	}
	
	return handleRes;
}


// Order Status.
function handleOrderStatusNormalization(rowIndex, rowObject, productLineValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (productLineValue > 0 && productLineValue <= fullResult.data.productLines.length)
	{
		// Product line exists - Validate status name.
		stringObject = stringValue.validateString(rowIndex, rowObject, "STATUS", valueLimits.orderStatus, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		// Add order status.
		handleRes = listItem.addItem(stringObject.preparedText, "orderStatusModes", fullResult);
	}
	
	return handleRes;
}


// Product
function handleProductItemNormalization(rowIndex, rowObject, orderStatusValue, productLineValue, fullResult)
{
	var productCodeObject = {};
	var msrpNumber = NaN;
	var msrpValid = false;
	
	var handleRes = -1;
	
	if (orderStatusValue > 0 && orderStatusValue <= fullResult.data.orderStatusModes.length)
	{
		// Order status exists - Validate product code.
		productCodeObject = stringValue.validateString(rowIndex, rowObject, "PRODUCTCODE", valueLimits.productCode, true, fullResult);
	}
	
	if (productCodeObject.valid === true)
	{
		// Validate MSRP.
		msrpNumber = numberValue.validateDecimal(rowIndex, rowObject, "MSRP", valueLimits.currency, valueDefaults.msrp, true, fullResult);
		msrpValid = Number.isFinite(msrpNumber);
	}
	
	if (msrpValid === true)
	{
		// Add product.
		handleRes = productItem.addItem(productCodeObject.preparedText, msrpNumber, productLineValue, fullResult.data.products);
	}
	
	return handleRes;
}


// Customer name.
function handleCustomerNameValidation(rowIndex, rowObject, productItemValue, fullResult)
{
	var handleRes = {};
	
	if (productItemValue > 0 && productItemValue <= fullResult.data.products.length)
	{
		// Product exists - Validate customer name.
		handleRes = stringValue.validateString(rowIndex, rowObject, "CUSTOMERNAME", valueLimits.customer, true, fullResult);
	}
	
	return handleRes;
}


// Customer details.
function handleCustomerDetailsValidation(rowIndex, rowObject, custNameValid, fullResult)
{
	var phoneNumberObject = {};
	var firstNameObject = {};
	var lastNameObject = {};
	var addressObject1 = {};
	var addressObject2 = {};
	var postalCodeObject = {};
	
	var handleRes = {};
	
	if (custNameValid === true)
	{
		// Validate phone number.
		phoneNumberObject = stringValue.validateString(rowIndex, rowObject, "PHONE", valueLimits.phoneNumber, true, fullResult);
	}
	
	if (phoneNumberObject.valid === true)
	{
		// Validate first name.
		firstNameObject = stringValue.validateString(rowIndex, rowObject, "CONTACTFIRSTNAME", valueLimits.contact, true, fullResult);
	}
	
	if (firstNameObject.valid === true)
	{
		// Validate last name.
		lastNameObject = stringValue.validateString(rowIndex, rowObject, "CONTACTLASTNAME", valueLimits.contact, false, fullResult);
	}
	
	if (lastNameObject.valid === true)
	{
		// Validate address line 1
		addressObject1 = stringValue.validateString(rowIndex, rowObject, "ADDRESSLINE1", valueLimits.address, true, fullResult);
	}
	
	if (addressObject1.valid === true)
	{
		// Validate address line 2
		addressObject2 = stringValue.validateString(rowIndex, rowObject, "ADDRESSLINE2", valueLimits.address, false, fullResult);
	}
	
	if (addressObject2.valid === true)
	{
		// Validate postal code.
		postalCodeObject = stringValue.validateString(rowIndex, rowObject, "POSTALCODE", valueLimits.postalCode, false, fullResult);
	}
	
	
	if (postalCodeObject.valid === true)
	{
		// All details valid - Create result object.
		handleRes["prepPhone"] = phoneNumberObject.preparedText;
		handleRes["prepFirstName"] = firstNameObject.preparedText;
		handleRes["prepLastName"] = lastNameObject.preparedText;
		handleRes["prepAddressLine1"] = addressObject1.preparedText;
		handleRes["prepAddressLine2"] = addressObject2.preparedText;
		handleRes["prepPostalCode"] = postalCodeObject.preparedText;
		handleRes["successful"] = true;
	}
	
	return handleRes;
}


// Add Customer.
function handleCustomerNormalization(custNameObj, custDetailsObj, cityValue, fullResult)
{
	var handleRes = -1;
	
	if (custDetailsObj.successful === true)
	{
		handleRes = customerItem.addCustomer(custNameObj, custDetailsObj, cityValue, fullResult.data.customers);
	}
	
	return handleRes;
}


// Order number.
function handleOrderNumberValidation(rowIndex, rowObject, customerValue, fullResult)
{
	var handleRes = NaN;
	
	if (customerValue > 0 && customerValue <= fullResult.data.customers.length)
	{
		// Customer exists - Validate number.
		handleRes = numberValue.validateWhole(rowIndex, rowObject, "ORDERNUMBER", valueLimits.orderNumber, NaN, false, fullResult);
	}
	
	return handleRes;
}


// Order item line number.
function handleLineNumberValidation(rowIndex, rowObject, orderValue, fullResult)
{
	var orderNumberValid = Number.isInteger(orderValue);
	var handleRes = NaN;
	
	if (orderNumberValid === true && orderValue > 0 && orderValue <= valueLimits.orderNumber)
	{
		// Order exists - Validate number.
		handleRes = numberValue.validateWhole(rowIndex, rowObject, "ORDERLINENUMBER", valueLimits.orderItem, NaN, false, fullResult);
	}
	
	return handleRes;
}


// Checks whether the row was normalized successfully.
function checkRowComplete(lineValue)
{
	var lineNumberValid = Number.isInteger(lineValue);
	var checkRes = false;
	
	if (lineNumberValid === true && lineValue > 0 && lineValue <= valueLimits.orderItem)
	{
		// Order line number valid.
		checkRes = true;
	}
	
	return checkRes;
}


module.exports =
{
	loopRows: loopDataRows
};