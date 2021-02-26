# Changelog

**./convert.js**
* Upon successful result, all data tables are displayed.
* Removed IF condition from 'runDataNormalization'
	* 'callInputFileCheck' will be run regardless.

---

**./src/processing/steps/general-pass.js**
* Added requirement for  './field-validation/string-value'
* loopDataRows
	* Renamed the 'fullResult' parameter to 'fullResultObj'
	* Renamed the 'rowIndex' variable to 'rowLoopIndex'
	* New variables:
		* 'currentDealSize' - Deal Size ID.
		* 'currentProductLine' - Product Line ID.
		* 'currentOrderStatus' - Order Status ID.
	* Expanded loop iteration to normalize the following columns:
		* DEALSIZE
		* PRODUCTLINE
		* STATUS
	* Split each IF condition into it's own function:
		* handleCountryNormalization
		* handleStateNormalization
		* *etc*
	* Condition splitting applies to both pre-existing and newly supported columns.
		* This does not apply to "TERRITORY" as it is the first column and has no dependencies.

---

**./src/processing/steps/field-validation/string-value.js**
* New file
* Stand-alone function used to validate string values.

---

**./src/common/input-errors.js**
* Wrote new functions:
	* 'setNumberTooLargeError' - Error for numbers that are too large.
	* 'setNumberNegativeError' - Error for negative numbers.
