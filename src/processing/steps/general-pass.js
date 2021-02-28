const valueLimits = require("../../common/value-limits");
const valueDefaults = require("../../common/value-defaults");
const listItem = require("./field-validation/list-item");
const countryItem = require("./field-validation/country-item");
const subLocation = require("./field-validation/sub-location");
const productItem = require("./field-validation/product-item");
const customerItem = require("./field-validation/customer-item");
const stringValue = require("./field-validation/string-value");
const numberValue = require("./field-validation/number-value");

function loopDataRows(origData, fullResultObj)
{
	var rowLoopIndex = 0;
	var currentRowObject = {};
	var currentTerritory = -1;
	var currentCountry = -1;
	var currentState = -1;
	var currentCity = -1;
	var currentDealSize = -1;
	var currentProductLine = -1;
	var currentOrderStatus = -1;
	var currentProduct = -1;
	var currentCustomerName = {};
	var currentCustomerDetails = {};
	var currentCustomerNumber = -1;
	var currentRowComplete = false;
	
	while (rowLoopIndex >= 0 && rowLoopIndex < origData.length && fullResultObj.canContinue === true)
	{
		currentRowObject = origData[rowLoopIndex];
		currentTerritory = -1;
		currentCountry = -1;
		currentState = -1;
		currentCity = -1;
		currentDealSize = -1;
		currentProductLine = -1;
		currentOrderStatus = -1;
		currentProduct = -1;
		currentCustomerName = {};
		currentCustomerDetails = {};
		currentCustomerNumber = -1;
		currentRowComplete = false;
		
		currentTerritory = handleTerritoryNormalization(rowLoopIndex, currentRowObject, fullResultObj);
		currentCountry = handleCountryNormalization(rowLoopIndex, currentRowObject, currentTerritory, fullResultObj);
		currentState = handleStateNormalization(rowLoopIndex, currentRowObject, currentCountry, fullResultObj);
		currentCity = handleCityNormalization(rowLoopIndex, currentRowObject, currentState, fullResultObj);
		currentDealSize = handleDealSizeNormalization(rowLoopIndex, currentRowObject, currentCity, fullResultObj);
		currentProductLine = handleProductLineNormalization(rowLoopIndex, currentRowObject, currentDealSize, fullResultObj);
		currentOrderStatus = handleOrderStatusNormalization(rowLoopIndex, currentRowObject, currentProductLine, fullResultObj);
		currentProduct = handleProductItemNormalization(rowLoopIndex, currentRowObject, currentOrderStatus, currentProductLine, fullResultObj);
		currentCustomerName = handleCustomerNameValidation(rowLoopIndex, currentRowObject, currentProduct, fullResultObj);
		currentCustomerDetails = handleCustomerDetailsValidation(rowLoopIndex, currentRowObject, currentCustomerName.valid, fullResultObj);
		currentCustomerNumber = handleCustomerNormalization(currentCustomerName, currentCustomerDetails, currentCity, fullResultObj);
		
		if (currentCustomerNumber > 0 && currentCustomerNumber <= fullResultObj.data.customers.length)
		{
			currentRowComplete = true;
		}
		
		
		if (currentRowComplete !== true)
		{
			fullResultObj.canContinue = false;
		}
		
		rowLoopIndex = rowLoopIndex + 1;
	}
}



function handleTerritoryNormalization(rowIndex, rowObject, fullResult)
{
	var stringObject = stringValue.validateString(rowIndex, rowObject, "TERRITORY", valueLimits.territory, true, fullResult);
	var handleRes = -1;
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "territories", fullResult);
	}
	
	return handleRes;
}


function handleCountryNormalization(rowIndex, rowObject, territoryValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (territoryValue > 0 && territoryValue <= fullResult.data.territories.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "COUNTRY", valueLimits.country, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = countryItem.addCountry(stringObject.preparedText, fullResult.data.countries, territoryValue);
	}
	
	return handleRes;
}


function handleStateNormalization(rowIndex, rowObject, countryValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (countryValue > 0 && countryValue <= fullResult.data.countries.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "STATE", valueLimits.state, false, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = subLocation.addLocation(stringObject.preparedText, "statesRegions", countryValue, fullResult);
	}
	
	return handleRes;
}


function handleCityNormalization(rowIndex, rowObject, stateRegionValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (stateRegionValue > 0 && stateRegionValue <= fullResult.data.statesRegions.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "CITY", valueLimits.city, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = subLocation.addLocation(stringObject.preparedText, "cities", stateRegionValue, fullResult);
	}
	
	return handleRes;
}


function handleDealSizeNormalization(rowIndex, rowObject, cityValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (cityValue > 0 && cityValue <= fullResult.data.cities.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "DEALSIZE", valueLimits.dealSize, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "dealSizes", fullResult);
	}
	
	return handleRes;
}


function handleProductLineNormalization(rowIndex, rowObject, dealSizeValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (dealSizeValue > 0 && dealSizeValue <= fullResult.data.dealSizes.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "PRODUCTLINE", valueLimits.productLine, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "productLines", fullResult);
	}
	
	return handleRes;
}


function handleOrderStatusNormalization(rowIndex, rowObject, productLineValue, fullResult)
{
	var stringObject = {};
	var handleRes = -1;
	
	if (productLineValue > 0 && productLineValue <= fullResult.data.productLines.length)
	{
		stringObject = stringValue.validateString(rowIndex, rowObject, "STATUS", valueLimits.orderStatus, true, fullResult);
	}
	
	if (stringObject.valid === true)
	{
		handleRes = listItem.addItem(stringObject.preparedText, "orderStatusModes", fullResult);
	}
	
	return handleRes;
}


function handleProductItemNormalization(rowIndex, rowObject, orderStatusValue, productLineValue, fullResult)
{
	var productCodeObject = {};
	var msrpNumber = NaN;
	var msrpValid = false;
	
	var handleRes = -1;
	
	if (orderStatusValue > 0 && orderStatusValue <= fullResult.data.orderStatusModes.length)
	{
		productCodeObject = stringValue.validateString(rowIndex, rowObject, "PRODUCTCODE", valueLimits.productCode, true, fullResult);
	}
	
	if (productCodeObject.valid === true)
	{
		msrpNumber = numberValue.validateDecimal(rowIndex, rowObject, "MSRP", valueLimits.currency, valueDefaults.msrp, true, fullResult);
		msrpValid = Number.isFinite(msrpNumber);
	}
	
	if (msrpValid === true)
	{
		handleRes = productItem.addItem(productCodeObject.preparedText, msrpNumber, productLineValue, fullResult.data.products);
	}
	
	return handleRes;
}


function handleCustomerNameValidation(rowIndex, rowObject, productItemValue, fullResult)
{
	var handleRes = {};
	
	if (productItemValue > 0 && productItemValue <= fullResult.data.products.length)
	{
		handleRes = stringValue.validateString(rowIndex, rowObject, "CUSTOMERNAME", valueLimits.customer, true, fullResult);
	}
	
	return handleRes;
}


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
		phoneNumberObject = stringValue.validateString(rowIndex, rowObject, "PHONE", valueLimits.phoneNumber, true, fullResult);
	}
	
	if (phoneNumberObject.valid === true)
	{
		firstNameObject = stringValue.validateString(rowIndex, rowObject, "CONTACTFIRSTNAME", valueLimits.contact, true, fullResult);
	}
	
	if (firstNameObject.valid === true)
	{
		lastNameObject = stringValue.validateString(rowIndex, rowObject, "CONTACTLASTNAME", valueLimits.contact, false, fullResult);
	}
	
	if (lastNameObject.valid === true)
	{
		addressObject1 = stringValue.validateString(rowIndex, rowObject, "ADDRESSLINE1", valueLimits.address, true, fullResult);
	}
	
	if (addressObject1.valid === true)
	{
		addressObject2 = stringValue.validateString(rowIndex, rowObject, "ADDRESSLINE2", valueLimits.address, false, fullResult);
	}
	
	if (addressObject2.valid === true)
	{
		postalCodeObject = stringValue.validateString(rowIndex, rowObject, "POSTALCODE", valueLimits.postalCode, false, fullResult);
	}
	
	if (postalCodeObject.valid === true)
	{
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


function handleCustomerNormalization(custNameObj, custDetailsObj, cityValue, fullResult)
{
	var handleRes = -1;
	
	if (custDetailsObj.successful === true)
	{
		handleRes = customerItem.addCustomer(custNameObj, custDetailsObj, cityValue, fullResult.data.customers);
	}
	
	return handleRes;
}


module.exports =
{
	loopRows: loopDataRows
};