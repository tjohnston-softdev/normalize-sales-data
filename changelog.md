# Changelog

**./src/common/output-types.js**
* New file - Stores allowed output type flags.

---

**./src/file-arg.js**
* Added requirement: './common/output-types'
* prepareFileTypeArgument
	* Rewrote IF structure to use defined output types.
	* Split error text to its own function 'displayInvalidError'
* Error text now lists all supported file types.

---

**./convert.js**
* Added requirement: './src/common/output-types'
* runDataNormalization
	* When checking 'fileTypeFlag', only positive numbers are accepted.
	* Zero is no longer a valid file type flag.
* callOutputFileWrite
	* Rewrote IF structure to use defined output types.
	* 'JSON' and 'ARRAY' output types not implemented yet.
* Commented out:
	* callSqlOutput
	* callCsvOutput
