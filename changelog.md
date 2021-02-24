# Changelog

**./convert.js**
* Required the following:
	* clear
	* ./src/common/exit-program
	* ./src/input/file-check
* runDataNormalization
	* Renamed the 'fileTypeValid' variable to 'fileTypeFlag'
	* After the file type argument has been validated:
		* Clear console.
		* Check whether the input file is valid (callInputFileCheck)
* New function 'callInputFileCheck'
	* Checks whether input file is valid.

---

**./src/input/file-check.js**
* New file.
* This is used to:
	* Check whether the source data file exists.
	* Validate it's size. (5MB or less)

---

**./src/common/fs-errors.js**
* New file.
* Writes error text for functions related to working with files and folders. (fs)

---

**./src/common/source-file.js**
* New file - Contains file name and text description of source data.