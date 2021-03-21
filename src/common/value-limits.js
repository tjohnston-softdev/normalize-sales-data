// Upper limits for string length and number values.

const territoryLimit = 8;								// Territory name.
const countryLimit = 32;								// Country name.
const stateLimit = 32;									// State name.
const cityLimit = 32;									// City name.
const dealSizeLimit = 16;								// Deal Size name.
const productLineLimit = 16;							// Product Line name.
const statusLimit = 16;									// Order Status name.
const productCodeLimit = 32;							// Product Code.
const currencyLimit = 99999;							// Maximum currency.
const customerLimit = 128;								// Customer name.
const phoneNumberLimit = 20;							// Phone number.
const contactLimit = 32;								// Individual contact name.
const addressLimit = 128;								// Address line.
const postalCodeLimit = 16;								// Postal Code.
const orderNumberLimit = 32767;							// Maximum order number.
const orderItemLimit = 255;								// Maximum items per order.
const orderQuantityLimit = 255;							// Maximum quantity.


module.exports =
{
	territory: territoryLimit,
	country: countryLimit,
	state: stateLimit,
	city: cityLimit,
	dealSize: dealSizeLimit,
	productLine: productLineLimit,
	orderStatus: statusLimit,
	productCode: productCodeLimit,
	currency: currencyLimit,
	customer: customerLimit,
	phoneNumber: phoneNumberLimit,
	contact: contactLimit,
	address: addressLimit,
	postalCode: postalCodeLimit,
	orderNumber: orderNumberLimit,
	orderItem: orderItemLimit,
	orderQuantity: orderQuantityLimit
};