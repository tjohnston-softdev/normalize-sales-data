# Changelog

**./src/output/del-file.js**
* New file
	* Deletes existing items inside output folder.
	* Only deletes files. Subfolders are ignored.

---

**./src/output-folder.js**
* Added requirements:
	* run-series
	* async-each-series
	* ./output/del-file
* Renamed 'coordinateFolderCreation' to 'initializeOutputFolder'
	* Renamed 'folderCallback' parameter to 'intlFolderCallback'
	* Renamed 'targetPath' variable to 'targetPathString'
	* Renamed 'folderErrorText' variable to 'intlErrorText'
	* Renamed 'folderErr' callback parameter to 'createErr'
	* Added "if it does not exist" to header comment.
* Wrote new function 'readExistingContents'
	* Retrieves list of items in output folder so they can be deleted.
	* Called after 'initializeOutputFolder'
* Wrote new function 'cleanFolderContents'
	* Deletes existing files from output folder.
	* Ignores subfolders.
	* Called after 'readExistingContents'

---

**./convert.js**
* Commented out 'callOutputFileWrite'
