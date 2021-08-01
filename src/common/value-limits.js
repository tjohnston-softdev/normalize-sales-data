// Upper limits for string length and number values.

function defineValueLimits()
{
	var defineRes = {};
	
	defineRes["territory"] = 8;								// Territory name.
	defineRes["country"] = 32;								// Country name.
	defineRes["state"] = 32;								// State name.
	defineRes["city"] = 32;									// City name.
	defineRes["dealSize"] = 16;								// Deal Size name.
	defineRes["productLine"] = 16;							// Product Line name.
	defineRes["orderStatus"] = 16;							// Order Status name.
	defineRes["productCode"] = 32;							// Product Code.
	defineRes["currency"] = 99999;							// Maximum currency.
	defineRes["customer"] = 128;							// Customer name.
	defineRes["phoneNumber"] = 20;							// Phone number.
	defineRes["contact"] = 32;								// Individual contact name.
	defineRes["address"] = 128;								// Address line.
	defineRes["postalCode"] = 16;							// Postal Code.
	defineRes["orderNumber"] = 30000;						// Maximum order number.
	defineRes["orderItem"] = 250;							// Maximum items per order.
	defineRes["orderQuantity"] = 250;						// Maximum quantity.
	
	return defineRes;
}


module.exports = defineValueLimits();