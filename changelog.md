# Changelog

**./convert.js**
* Added requirement for './src/output-sql-files.js'
* The 'callSqlOutput' function is now complete.
* SQL output will proceed.

---

**./src/output/save-sql.js**
* New file
	* Used to write SQL output files.
	* Writes INSERT statement for the table data.
	* Data is escaped and formatted.
* If, for some reason, there are no objects to insert:
	* Output file will not insert any data.
	* Will only contain commented table name as a placeholder.

---

**./src/output-sql-files.js**
* New file.
	* Used to coordinate SQL output.
	* Only outputs GlobalTerritory.
	* While a 'Country' file is written, no data will be inserted to test blank placeholder.
