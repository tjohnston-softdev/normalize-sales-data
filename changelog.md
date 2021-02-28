# Changelog

**./convert.js**
* On success, the number of customer entries will be displayed.

---

**./src/processing/steps/general-pass.js - Requirements**
* Added './field-validation/customer-item'

---

**./src/processing/steps/general-pass.js - New Functions**
* 'handleCustomerNameValidation' - Validates and prepares customer name.
* 'handleCustomerDetailsValidation' - Validates and prepares customer details.
	* Phone number.
	* Contact name
	* Address
	* Postal Code
* 'handleCustomerNormalization' - Populates 'Customer' table.

---

**./src/processing/steps/general-pass.js - loopDataRows**
* New variables:
	* currentCustomerName
	* currentCustomerDetails
	* currentCustomerNumber
* Expanded to normalize the following columns:
	* CUSTOMERNAME
	* PHONE
	* CONTACTFIRSTNAME
	* CONTACTLASTNAME
	* ADDRESSLINE1
	* ADDRESSLINE2
	* POSTALCODE

---

**./src/processing/steps/field-validation/customer-item.js**
* New file - Used to:
	* Add new customer entries to the normalized database.
	* Retrieve the ID of an existing customer entry.
