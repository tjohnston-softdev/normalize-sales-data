# Changelog

**./src/processing/object-definition/**
* When saving normalized objects, they are now stored as value arrays instead of JSON.
	* Index numbers are used instead of property names.
	* Property order remains unchanged.


---

**./src/processing/object-definition/list-item.js**
* 'currentExistingItem' is now an array.
* 'newItemObject' is now an array.
* 'currentName' now refers to index 1 and not 'itemName'
* When 'existID' is set, it now refers to index 0 and not 'itemID'

---

**./src/processing/object-definition/country-item.js**
* 'currentCountryObject' and 'newCountryObject' are now arrays.
* 'currentCountryString' now refers to index 1 and not 'name'.
* When 'existID' is set, it now refers to index 0 and not 'countryNumber'

---

**./src/processing/object-definition/sub-location.js**
* 'currentLocationObject' and 'newLocationObject' are now arrays.
* 'currentLocationName' refers to index 1 and not 'name'
* Declared new variable 'currentParentString'
	* Stores parent location ID as string.
	* 'currentParentID' casts this into a number.
* 'currentParent...' variables refer to index 2 and not 'parentLocation'
* When 'existID' is set, it now refers to index 0 and not 'locationID'

---

**./src/processing/object-definition/product-item.js**
* 'currentProductObject' and 'newProductObject' are now arrays.
* 'currentProductCode' refers to index 1 and not 'code'
* When 'existID' is set, it now refers to index 0 and not 'number'

---

**./src/processing/object-definition/customer-item.js**
* 'currentCustomerObject' and 'newCustomerObject' are now arrays.
* 'currentCustomerName' refers to index 1 and not 'custName'
* When 'existID' is set, it now refers to index 0 and not 'custNumber'

---

**./src/processing/object-definition/order-details.js addOrderEntryRow**
* 'currentExistingObject' and 'newOrderObject' are now arrays.
* Declared new variable 'currentIdentificationString'
	* Stores Order ID as string.
	* 'currentIdentificationNumber' casts this into a number.
* 'existFlag' is unchanged as it uses the loop index.

---

**./src/processing/object-definition/order-details.js addOrderItemRow**
* 'currentExistingObject' and 'newOrderItemObject' are now arrays.
* Declared new variables:
	* currentParentString
	* currentChildString
* Renamed variables:
	* 'currentParent' to 'currentParentNumber'
	* 'currentChild' to 'currentChildNumber'
* 'current...Number' variables are cast from 'current...String' variables.
* 'currentParent...' variables refer to index 0 and not 'orderEntryNumber'
* 'currentChild...' variables refer to index 1 and not 'orderLineNumber'

---

**./src/processing/object-definition/remain-cols.js**
* This file remains unchanged because it compiles unnormalized data after the general pass is complete.

---

**./src/output-csv-files.js**
* Territory data is output as a CSV file.
	* Normalized data is used instead of hard-coded test data from before.

---

**./src/output/save-csv.js**
* Removed the 'testData' global variable.
* saveCsvFile
	* When calling 'convertJsonToCsv', the 'objectArray' variable is used instead of 'testData'
	* If for some reason 'objectArray' is empty, only the header row will be written.
