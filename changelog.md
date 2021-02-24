# Changelog

**./output-files**
* Deleted folder for now.

---

**.gitignore**
* New file - Currently ignores the following:
	* 'relational-diagram' subfolder.
	* 'sales_data_sample.csv' file.
* This is because they are already committed to the repo.
	* I don't intend to change them.
	* Git client won't flag false changes.

---

**./convert.js**
* This is the main script file.
* Handled by the 'runDataNormalization' function.
* So far, this file only reads and validates the given argument.

---

**./src/input/file-arg.js**
* New file - Used to read, prepare, and validate file type argument.
* Valid file types are 'sql' and 'csv'

---

**./src/common/exit-program.js**
* New file - Used to terminate program with message.
* Has functions for both error and success.