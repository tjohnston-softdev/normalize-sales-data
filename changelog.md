# Changelog

**./src/processing/order-pass.js**
* Renamed the 'checkRowComplete' function to 'checkAdd'
* 'loopDataRows' variables:
	* Removed 'currentAddNumber'
	* Declared 'currentOrderAdd'
	* Declared 'currentLineAllowed'
	* Declared 'currentLineAdd'
* handleItemAdd
	* Removed the 'priceValid' variable.
	* Declared 'allowAdd' parameter.
	* Replaced 'priceValid' with 'allowAdd' for the IF structure.
* Rewrote the IF structure in 'loopDataRows' so that the first item of each order isn't skipped.
* Replaced 'currentAddNumber' with 'currentOrderAdd' when calling 'handleOrderAdd'
