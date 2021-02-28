# Changelog

**./convert.js**
* On success, all normalized data will be displayed.

---

**./src/processing/steps/general-pass.js**
* Added requirement for './field-validation/remain-cols'
* Wrote new function 'checkRowComplete'
	* Used to check whether the current row has been successfully normalized.
	* Based on Customer ID number.
* loopDataRows
	* Declared new variable 'currentRemainingData'
		* Object that contains remaining order-related data and Foreign Key numbers.
		* Unlike other loop variables, this will not be assigned until all normalization is complete.
	* Removed the 'currentCustomerNumber' IF condition.
	* Rewrote the 'currentRowComplete' IF condition:
		* If the row is complete, remove unnecessary data from row object.
		* Otherwise, stop looping rows.

---

**./src/processing/steps/field-validation/remain-cols.js**
* New file. - Used to:
	* Remove unnecessary data from row objects.
	* Save Foreign Key numbers necessary for further normalization.
