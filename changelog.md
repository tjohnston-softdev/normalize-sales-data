# Changelog

**./src/convert.js**
* Script can now be run without argument.
* Successful result displays number of cities.

---

**./src/processing/steps/general-pass.js**
* Required the following files in the './field-validation' folder.
	* country-item.js
	* sub-location.js
* loopDataRows
	* Declared new variables:
		* 'currentCountry' - Stores Country ID.
		* currentState - Stores 'StateRegion' table ID.
		* 'currentCity' - Stores City ID.
	* Expanded the function loop code to normalize the following columns:
		* COUNTRY
		* STATE
		* CITY

---

**./src/processing/steps/field-validation/list-item.js**
* Renamed variable in 'addItem' function:
	* 'existingItemIndex' to 'existingIndex'

---

**./src/processing/steps/field-validation/country-item.js**
* New file.
* Used to validate "COUNTRY" values and add them to the normalized data table.
* This is similar to 'list-item.js', except that:
	* Countries are stored as objects and not just plain strings.
	* Each object contains the name, and associated territory ID.

---

**./src/processing/steps/field-validation/sub-location.js**
* New file - Used to:
	* Validate "STATE" and "CITY column values.
	* Add them to their respective normalized table.
* When handling these values, they depend on the previously used ID.
	* "COUNTRY" ---> "STATE" ---> "CITY"

---

**./src/input/file-arg.js**
* Disabled error on 'prepareFileTypeArgument'
	* Commented out call to 'exitProgram'
	* Set 'prepRes' to 1 

