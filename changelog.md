# Changelog

**./src/common/fs-errors.js**
* Renamed 'writeFolderCreateErrorText' to 'writeFolderActionErrorText'
	* Used for multiple folder errors, not just creating.
	* Added 'vContext' parameter.
	* Replaced "creating" with 'vContext'
	* Called publicly as 'writeFolderAction'
* Changed 'writeFileActionErrorText' public name.
	* Before: 'writeAction'
	* After: 'writeFileAction'

---

**./src/%mainScript%.js**
* Replaced 'fsErrors.writeAction' with 'fsErrors.writeFileAction' in:
	* file-check.js
	* file-read.js
	* save-csv.js
	* save-json.js
	* save-sql.js
* output-folder.js - coordinateFolderCreation
	* Replaced 'fsErrors.writeFolderCreate' with 'fsErrors.writeFolderAction'
	* Added "creating" argument to 'fsErrors.writeFolderAction' call.
