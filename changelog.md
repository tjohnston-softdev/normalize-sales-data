# Changelog

**./src/processing/order-pass.js loopDataRows**
* Replaced 'rowLoopIndex' with 'currentIndex' when calling:
	* handleQuantityValidation
	* handlePriceValidation
	* handleItemAdd
	* handleOrderAdd
	* dateValue.validateDate

---

**./src/output/export-spec.js**
* Added 'displayNumber' to 'getOrderItemAttributes'