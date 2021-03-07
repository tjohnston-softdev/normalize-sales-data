# Changelog

**./src/common/date-string.js**
* New file - Used to write readable string from date object.
* Example: 2021-03-07

---

**./src/processing/object-definition/list-item.js**
* Changed 'currentExistingItem' to an object and not a string.
* Declared new variables:
	* newItemObject
	* currentName
* Removed 'existFlag' variable. Replaced with 'existID'
* Changed the match IF structure to use 'currentName' instead of 'currentExistingItem'
* List items are now created as objects and not basic strings.
* The 'itemID' property is now used as the target ID and not a loop index offset.

---

**./src/processing/object-definition/country-item.js**
* Removed 'existFlag' variable. Replaced with 'existID'
* Added 'countryNumber' property to 'newCountryObject'
	* Now used as the target ID and not a loop index offset.
* When defining new countries:
	* 'addRes' is now assigned before 'newCountryObject'
	* 'addRes' assignment is now: `countryArr.length + 1`
	* 'newCountryObject' properties are written individually and not on a single line.
	* 'territory' property is now cast as a string.

---

**./src/processing/object-definition/sub-location.js**
* Removed 'existFlag' variable. Replaced with 'existID'
* 'currentParentID' is now explicitly cast as a number.
* Added 'locationID' property to 'newLocationObject'
	* Now used as the target ID and not a loop index offset.
* When defining new locations:
	* 'addRes' is now assigned before 'newLocationObject'
	* 'addRes' assignment is now: `arrObj.length + 1`
	* 'newLocationObject' properties are written individually and not on a single line.
	* 'parentLocation' property is now cast as a string.

---

**./src/processing/object-definition/product-item.js**
* Removed 'existFlag' variable. Replaced with 'existID'
* Added 'number' property to 'newProductObject'
	* Now used as the target ID and not a loop index offset.
* When defining new products:
	* 'addRes' is now assigned before 'newProductObject'
	* 'addRes' assignment is now: `productArr.length + 1`
	* 'newProductObject' properties are written individually and not on a single line.
	* 'line' and 'msrp' properties are now cast as strings.

---

**./src/processing/object-definition/customer-item.js**
* Removed 'existFlag' variable. Replaced with 'existID'
* Added 'custNumber' property to 'newCustomerObject'
	* Now used as the target ID and not a loop index offset.
* When defining new customers:
	* 'addRes' is now assigned before 'newCustomerObject' properties.
	* 'addRes' assignment is now: `customerArr.length + 1`
	* The 'city' property is now cast as a string.

---

**./src/processing/object-definition/order-details.js**
* Added requirement for '../../common/date-string'
* addOrderEntryRow
	* Declared new variable 'currentIdentificationNumber'
	* Result properties cast as strings:
		* identificationNumber
		* customer
		* statusCode
	* The 'date' result property is assigned using 'dateString'
* addOrderItemRow
	* 'currentParent' and 'currentChild' are cast as numbers.
	* All result properties are cast as strings.

---

**./src/output/save-csv.js**
* Changed 'testData' structure into an MD array and not JSON objects.
