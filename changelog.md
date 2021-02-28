# Changelog

**./src/processing/steps/field-validation/string-value.js**
* validateStringText
	* Added 'entryRequired' parameter.
	* Indicates whether string is required.
	* Fixed function call on 'correctType' assignment.
* checkLength
	* Added 'entryReq' parameter. - Same as above.
	* If this is true, empty strings will flag an error.
	* Otherwise, empty strings are allowed.

---

**./src/processing/steps/field-validation/list-item.js**
* Removed:
	* 'validateListItem' function.
	* '../../../common/input-errors' requirement.
* Renamed the 'addItem' function to 'addListItem'
	* Public alias is 'addItem'

---

**./src/processing/steps/field-validation/country-item.js**
* Removed:
	* 'validateCountryItem' function.
	* 'colName' global.
	* '../../../common/value-limits' requirement.
	* '../../../common/input-errors' requirement.
* Renamed the 'addCounry' function to 'addCountryItem'
	* Notice the typo.
	* Public alias is 'addCountry'

---

**./src/processing/steps/field-validation/sub-location.js**
* Removed:
	* 'validateSubLocation' function.
	*  '../../../common/input-errors' requirement.
* Renamed the 'addLocation' function to 'addLocationItem'
	* Public alias is 'addLocation'

---

**./src/processing/steps/general-pass.js**
* Wrote new function 'handleTerritoryNormalization'
	* Despite having no dependencies, territory normalization is still being split into it's own function.
	* As of now, string validation and adding data entries are two separate functions.
* 'currentTerritory' variable in 'loopDataRows'
	* Loop reset and assignment are now on separate lines.
* handleCountryNormalization
	* Declared new variable 'stringObject' - String validation object.
	* If the Territory ID exists, read and validate country string.
	* If the country string is valid, add to normalized array with parent territory.
* Rewrote the following functions to use the same structure as 'handleCountryNormalization'
	* handleStateNormalization
	* handleCityNormalization
	* handleDealSizeNormalization
	* handleProductLineNormalization
	* handleOrderStatusNormalization
