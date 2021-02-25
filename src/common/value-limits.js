const territoryLimit = 8;
const countryLimit = 32;
const stateLimit = 32;
const cityLimit = 32;
const dealSizeLimit = 16;
const productLineLimit = 16;
const statusLimit = 16;
const productCodeLimit = 32;
const currencyLimit = 99999;
const customerLimit = 128;
const phoneNumberLimit = 20;
const contactLimit = 32;
const addressLimit = 128;
const postalCodeLimit = 16;
const orderItemLimit = 255;
const orderQuantityLimit = 255;


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
	orderItem: orderItemLimit,
	orderQuantity: orderQuantityLimit
};