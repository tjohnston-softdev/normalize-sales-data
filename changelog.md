# Changelog

**package.json, package-lock.json**
* Installed 'run-series' package.

---

**./convert.js**
* Added requirement for './src/output-csv-files'
* callOutputFolder
	* Renamed 'normDataObj' parameter to 'normalizedDataObj'
* callOutputFileWrite
	* Renamed 'normData' parameter to 'normalizedData'
	* Now diverts into different functions depending on file type.
	* Unknown file types flag a generic error.
* callSqlOutput
	* New function - Calls SQL output.
	* Placeholder for now.
* callCsvOutput
	* New function - Calls CSV output.
	* Completed.

---

**./src/output-csv-files.js**
* New file - Coordinates process for writing output CSV files.
	* So far, this is just a placeholder.
	* The structure is in place but no files are actually written yet.

---

**./src/output/export-spec.js**
* New file - Defines specification data for export files.
	* Writes full file path with both name and extension.
	* Stores table name.
	* Stores table attributes. (CSV only)
