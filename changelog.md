# Changelog

**Changes from Version 1**
* Reduced order-related value limits
	* 'orderNumber' from 32767 to 30000.
	* 'orderItem' from 255 to 250.
	* 'orderQuantity' from 255 to 250.
* Minimized table markdown in 'Column Mapping'
* Updated packages:
	* ora
	* papaparse
* JSON output modes.
	* Multi-dimensional array. (array)
	* Array of objects. (object)
* If no output type is entered, a separate error message will be displayed.
* Output modes are now referred to as 'output types' and not 'file types'
* Fixed "SQL" header comment typo.
* Existing files in the output folder will be deleted before any new files are generated.
