# Changelog

**./src/output-json-files.js**
* New file - Script for exporting normalized data as JSON files.
	* Used for both 'ARRAY' and 'OBJECT' output modes.
	* The difference is that one includes named attributes.

---

**./src/output/save-json.js**
* New file - Saves normalized data as JSON file.
	* Can convert multi-dimensional array to object array if need be.

---

**./convert.js**
* Added requirement: './src/output-json-files'
* Wrote new function 'callJsonOutput'
	* Runs 'outputJsonFiles' script.
* callOutputFileWrite
	* Uncommented 'callSqlOutput'
	* Uncommented 'callCsvOutput'
	* Added 'callJsonOutput' to respective modes.
	* Changed "File" to "Output" for default error message.
* Renamed variables in 'runDataNormalization'
	* 'givenFileType' to 'givenOutputType'
	* 'fileTypeFlag' to 'outputTypeFlag'
