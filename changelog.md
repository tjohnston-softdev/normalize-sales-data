# Changelog

**./src/common/output-types.js**
* Declared 'enteredType' global. - Stores input file type flag.
* Wrote functions to access 'enteredType
	* saveEntryFlag
	* getEntryFlag

---

**./convert.js**
* runDataNormalization
	* On success, call 'outputTypes.saveEntry'
	* Renamed 'outputTypeFlag' variable to 'preparedFlag'
* Removed parameters:
	* 'conversionTypeFlag' from 'callInputFileCheck'
	* 'convTypeFlag' from 'callInputFileRead'
	* 'convType' from 'callDataProcessing'
	* 'cTypeFlag' from 'callOutputFolder'
	* 'cType' from 'callOutputFileWrite'
* Declared 'oType' variable in 'callOutputFileWrite'
	* Retrieves saved entered output mode.
	* Assigned with 'outputTypes.getEntry'
	* Replaces 'cType' references.
