# Changelog

**./convert.js**
* On success, the number of product items will be displayed.

---

**./src/processing/steps/general-pass.js**
* New requirements:
	* ./field-validation/number-value
	* ../../common/value-defaults
	* ./field-validation/product-item
* handleProductItemNormalization
	* New function.
	* Used to normalize 'Product Line' and 'MSRP' columns.
	* Populates the 'Product' table in the database.
* loopDataRows
	* Declared new variable 'currentProduct'
		* Current Product ID.
	* Expanded to normalize the following columns:
		* PRODUCTCODE
		* MSRP

---

**./src/processing/steps/field-validation/product-item.js**
* New file - Used to:
	* Add new product items to the normalized database.
	* Retrieve the ID of an existing product item.
