# Changelog

**./convert.js**
* On successful result, display:
	* Number of order entries.
	* Number of order items.
	* First Order Item object.

---

**./src/processing/order-pass.js loopDataRows**
* Reset 'currentAddNumber' at the start of each loop iteration.
* Expanded to normalize the following columns:
	* QUANTITYORDERED
	* PRICEEACH
* These variables are assigned outside of the IF structure:
	* currentQuantity
	* currentPrice

---

**./src/processing/order-pass.js - New Functions**
* 'handleQuantityValidation' - Calls 'QUANTITYORDERED' validation.
* 'handlePriceValidation' - Calls 'PRICEEACH' validation.
* 'handleItemAdd' - Adds 'OrderItem' to result data set.

---

**./src/processing/field-validation/order-details.js**
* addOrderEntryRow
	* Added 'identificationNumber' object property to IF condition.
	* Changed public name from 'addOrderEntry' to 'addEntry'
* Wrote new function 'addOrderItemRow'
	* Used to find or add 'OrderItem' objects.
	* Public name is 'addItem'
