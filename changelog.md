# Changelog

**./src/output-csv-files.js**
* Added requirement for './output/save-csv'
* Added call to 'saveCsv' in 'coordinateCsvWrite'
	* Tests CSV output with territory data.

---

**./src/file-check.js**
* Added input file name argument to 'fsErrors.writeActionText' call in 'coordinateInputCheck'

---

**./src/file-read.js**
* Added input file name argument to 'fsErrors.writeActionText' call in 'coordinateInputRead'

---

**./src/output/save-csv.js**
* New file - Used to:
	* Convert JSON object data to CSV data.
	* Save as output file.
* Currently uses hard-coded test data.

---

**./src/common/fs-errors.js**
* Added 'path' module requirement.
* writeFileActionErrorText
	* Added 'vFilePath' parameter - Target file path.
	* File path is appended to the error message.
