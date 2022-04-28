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
	var rowLoopIndex = 0;
	
	// Loop each row until end reached or error flagged.
	while (rowLoopIndex >= 0 && rowLoopIndex < origData.length && fullResultObj.canContinue)
	{
		rowObject = origData[rowLoopIndex];
		
		// Read, validate and normalize data sequentially.
		var territory = handleTerritoryNormalization(rowLoopIndex, rowObject, fullResultObj);
		var country = handleCountryNormalization(rowLoopIndex, rowObject, territory, fullResultObj);
		var state = handleStateNormalization(rowLoopIndex, rowObject, country, fullResultObj);
		var city = handleCityNormalization(rowLoopIndex, rowObject, state, fullResultObj);
		var dealSize = handleDealSizeNormalization(rowLoopIndex, rowObject, city, fullResultObj);
		var productLine = handleProductLineNormalization(rowLoopIndex, rowObject, dealSize, fullResultObj);
		var itemStatus = handleOrderStatusNormalization(rowLoopIndex, rowObject, productLine, fullResultObj);
		var product = handleProductItemNormalization(rowLoopIndex, rowObject, itemStatus, productLine, fullResultObj);
		var custName = handleCustomerNameValidation(rowLoopIndex, rowObject, product, fullResultObj);
		var custDetails = handleCustomerDetailsValidation(rowLoopIndex, rowObject, custName.valid, fullResultObj);
		var custNumber = handleCustomerNormalization(custName, custDetails, city, fullResultObj);
		var orderNumber = handleOrderNumberValidation(rowLoopIndex, rowObject, custNumber, fullResultObj);
		var lineNumber = handleLineNumberValidation(rowLoopIndex, rowObject, orderNumber, fullResultObj);
		var rowComplete = checkRowComplete(lineNumber);
		
		
		if (rowComplete)
		{
			// Save normalized data.
			var currentData = remainCols.compileData(rowLoopIndex, rowObject, orderNumber, lineNumber, itemStatus, product, custNumber, dealSize);
			origData[rowLoopIndex] = currentData;
		}
		else
		{
			// Stop reading.
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex += 1;
	}
}


// Territory.
function handleTerritoryNormalization(rowIndex, rowObject, fullResult)
{
	var stringObject = stringValue.validateString(rowIndex, rowObject, "TERRITORY", valueLimits.territory, true, fullResult);
	var handleRes = -1;
	
	if (stringObject.valid)
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
	
	if (stringObject.valid)
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
	
	if (stringObject.valid)
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
	
	if (stringObject.valid)
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
	
	if (stringObject.valid)
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
	
	if (stringObject.valid)
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
	
	if (stringObject.valid)
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
	
	if (productCodeObject.valid)
	{
		// Validate MSRP.
		msrpNumber = numberValue.validateDecimal(rowIndex, rowObject, "MSRP", valueLimits.currency, valueDefaults.msrp, true, fullResult);
		msrpValid = Number.isFinite(msrpNumber);
	}
	
	if (msrpValid)
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
	
	if (custNameValid)
	{
		// Validate phone number.
		phoneNumberObject = stringValue.validateString(rowIndex, rowObject, "PHONE", valueLimits.phoneNumber, true, fullResult);
	}
	
	if (phoneNumberObject.valid)
	{
		// Validate first name.
		firstNameObject = stringValue.validateString(rowIndex, rowObject, "CONTACTFIRSTNAME", valueLimits.contact, true, fullResult);
	}
	
	if (firstNameObject.valid)
	{
		// Validate last name.
		lastNameObject = stringValue.validateString(rowIndex, rowObject, "CONTACTLASTNAME", valueLimits.contact, false, fullResult);
	}
	
	if (lastNameObject.valid)
	{
		// Validate address line 1
		addressObject1 = stringValue.validateString(rowIndex, rowObject, "ADDRESSLINE1", valueLimits.address, true, fullResult);
	}
	
	if (addressObject1.valid)
	{
		// Validate address line 2
		addressObject2 = stringValue.validateString(rowIndex, rowObject, "ADDRESSLINE2", valueLimits.address, false, fullResult);
	}
	
	if (addressObject2.valid)
	{
		// Validate postal code.
		postalCodeObject = stringValue.validateString(rowIndex, rowObject, "POSTALCODE", valueLimits.postalCode, false, fullResult);
	}
	
	
	if (postalCodeObject.valid)
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
	
	if (custDetailsObj.successful)
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
	
	if (orderNumberValid && orderValue > 0 && orderValue <= valueLimits.orderNumber)
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
	return (lineNumberValid && lineValue > 0 && lineValue <= valueLimits.orderItem);
}


module.exports =
{
	loopRows: loopDataRows
};