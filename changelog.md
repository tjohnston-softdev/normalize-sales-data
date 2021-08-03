# Changelog

**./src/file-arg.js**
* Repurposed 'displayInvalidError' to be able to write multiple error types.
	* Added 'vContext' parameter.
	* Replaced "Invalid file type." with 'vContext'. Refer to 'prepareFileTypeArgument'
* readFileTypeArgument
	* Trimmed leading whitespace from 'readRes'
	* If 'readRes' is empty, an error message will be displayed.

---

**./convert.js - runDataNormalization**
* 'fileArg.prepareFileType' will only be called if 'givenOutputType' is not empty.
	* This prevents both error messages from being displayed.
* 'preparedFlag' is declared as `-1` instead of `null`
* Commented out 'callInputFileCheck' call.
