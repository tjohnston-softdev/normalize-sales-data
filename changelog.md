# Changelog

**./convert.js**
* On successful result, display first row data.

---

**./src/processing/general-pass.js**
* loopDataRows
	* Declared variables:
		* currentOrderNumber
		* currentLine
	* Renamed variables:
		* 'currentRemainingData' to 'currentData'
		* 'currentRowObject' to 'currentRow'
	* Expanded to validate:
		* Order number
		* Order line number
* New functions:
	* 'handleOrderNumberValidation' - Validates order number.
	* 'handleLineNumberValidation' - Validates order line number.
* Rewrote the 'checkRowComplete' function to check the order line number instead of customer.

---

**./src/processing/order-sort.js**
* New file - Used to sort parsed rows by order.
	* ORDERNUMBER
	* ORDERLINENUMBER

---

**./src/processing/field-validation/remain-cols.js**
* Added new parameters:
	* orderID
	* lineNum
* Removed variables:
	* localOrderNumber
	* localLineNumber
* Result properties:
	* Removed 'orderNumCol'
	* Removed 'lineCol'
	* Added 'orderNumber' - Uses 'orderID'
	* Added 'lineNumber' - Uses 'lineNum'
* Changed public name from 'compileRemainingColumns' to 'compileData'

---

**./src/proc-data.js**
* Added requirement for './processing/order-sort'
* Called 'orderSort' in 'coordinateDataProcessing' after the general pass.
