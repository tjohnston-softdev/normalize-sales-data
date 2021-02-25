# Changelog

**./convert.js**
* After 'callInputFileRead' has finished successfully, the 'complete' message will be displayed instead of a placeholder.

---

**./src/input/file-read.js**
* verifyParseResult
	* A valid result will only be returned if any rows were successfully parsed (parseResObj.data.length > 0)
	* Otherwise, an 'empty' error will be flagged instead of a generic error.
* parseFileText
	* Removed call to 'csvErrors.writeGenericParse'
	* Generic error text is written locally instead.

---

**./src/common/csv-errors.js**
* Removed the function 'writeGenericParseError'
	* As of now, the message is only used once.
	* Now defined locally in 'file-read.js'
* Changes to 'writeSpecificParseError'
	* Declared new variable 'rowNum'
		* Data row number.
		* Offset from 'errorObject.row', which is an index.
	* Changed the "Line index" field to "Row Number"
		* Uses 'rowNum' as a value instead of 'errorObject.row'
	* For the purposes of row numbering, the header does not count.

---

**./src/common/exit-program.js**
* Added a line break before messages in both functions.