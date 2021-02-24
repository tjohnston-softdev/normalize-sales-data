# Changelog

**./convert.js**
* Added requirement for './src/input/file-read'
* Renamed variables in 'callInputFileCheck'
	* 'inpReadTaskErr' to 'inpChkTaskErr'
	* 'inpReadTaskRes' to 'inpChkTaskRes'
* Wrote new function 'callInputFileRead'
	* Run after 'callInputFileCheck'
	* Used to read and parse input CSV file.

---

**./src/input/file-check.js**
* Updated the spinner text to refer to 'checking the file' instead of reading it.
	* **Idle:** Checking Input File
	* **Success:** Input File Exists
	* **Fail:** Input File Check Error
* Renaming:
	* 'readSpinner' variable in 'checkInputDataFile' to 'checkSpinner'
	* Callback variable in 'checkInputDataFile' to 'inputCheckCallback'
	* 'coordinateInputRead' function to 'coordinateInputCheck'
	* Callback variable in 'coordinateInputCheck' to 'inpChkCallback'
	* Callback variable in 'verifyTargetEntry' to 'verifyCallback'

---

**./src/input/file-read.js**
* New file - Used to read and parse input CSV.

---

**./src/common/value-prep.js**
* New file.
* Contains functions that check value type and prepare contents.
* So far, has functions to check 'object' and 'string' types.

---

**./src/common/csv-errors.js**
* New file - Writes error text for CSV files.
* So far, only writes errors for parsing.
* This includes:
	* Generic error message.
	* Support for specific error types.