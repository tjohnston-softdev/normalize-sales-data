# Changelog

**./convert.js**
* Added requirement for './src/processing/proc-data'
* callInputFileCheck
	* Renamed the 'inpChkTaskErr' variable to 'inpChkErr'.
	* Removed the 'inpChkTaskRes' because of redundancy.
* callInputFileRead
	* Renamed the 'inpReadTaskErr' variable to 'inpReadErr'
	* Renamed the 'inpReadTaskRes' variable to 'inpReadData'
* New function - callDataProcessing
	* Executed after 'callInputFileRead'
	* Used to call data normalization script (see 'procData')
* If the script is successful, a list of known territories will be displayed.

---

**./src/common/input-errors.js**
* New file.
* Defines errors related to data processing and input validation.
* Unlike similar files, the error details are stored in an object rather than writing full error text.
	* The error text itself is written by combining the object properties.

---

**./src/common/norm-res.js**
* New file - Defines result object for data normalization.
* Contains data arrays, error object, and success status.

---

**./src/common/value-limits.js**
* New file - Contains maximum values for string length and other numbers.

---

**./src/common/value-prep.js**
* Defined regular expression global variable 'leadingSpaceRegex'
	* Used to trim leading whitespace.
* Wrote new function 'sanitizeInputString'
	* Trims leading space at the start of, end of, and during the string.

---

**./src/processing/proc-data.js**
* New file - Coordinates data normalization.
* While the normalization itself is incomplete, the structure of this file has been made.
	* Includes spinner text, callbacks, etc.

---

**./src/processing/steps/general-pass.js**
* New file
* Used to run a general pass of the flat data.
* Populates simpler data tables.
* This will apply to all tables, other than 'OrderEntry' and 'OrderItem'
* So far, this only processes the 'TERRITORY' column into the 'GlobalTerritory' table.
* The basic structure is there.

---

**./src/processing/steps/field-validation/list-item.js**
* New file - Used to validate 'list items' and add them to their respective table.
* This applies to tables that are lists of known strings.
* Examples include:
	* GlobalTerritory
	* DealSize
	* ProductLine
	* *etc*
