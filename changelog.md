# Changelog

**.gitignore**
* Output folder will be ignored.

---

**./convert.js**
* Added requirement for './src/output-folder'
* runDataNormalization
	* Script will only continue if the argument flag is valid.
	* Otherwise, an error will be displayed (./src/file-arg.js)
* callDataProcessing
	* Runs 'callOutputFolder' on success.
	* Renamed the 'dataProcRes' variable to 'normalizedDataObject'
* callOutputFolder
	* New function
	* Calls output folder creation.
	* Runs 'callOutputFileWrite' on success.
* callOutputFileWrite
	* New function.
	* This is going to call output file creation.
	* So far, it only displays a message depending on file type argument.
* Calls to 'exitProgram' have a True line break argument
	* These error messages will have a line break. (as previous)

---

**./src/file-arg.js**
* Restored invalid argument error.
	* Uncommented 'exitProgram' call.
	* 'prepRes' is set to negative.
* The call to 'exitProgram' has a False line break argument.
	* No line break when displaying argument error.

---

**./src/output-folder.js**
* New file - Used to create output folder.

---

**./src/common/exit-program.js**
* Revised 'callErrorExit' so that the line break is optional.
	* Added 'inclBreak' parameter. - Handles line break IF
* 'callSuccessfulExit' includes a line break regardless.

---

**./src/common/fs-errors.js**
* Wrote new function 'writeFolderCreateErrorText'
	* Output folder creation error.
