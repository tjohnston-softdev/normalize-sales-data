# Changelog

**./src/common/value-limits.js**
* Added 'orderNumberLimit' variable.
	* Represents maximum Order ID number.
	* Upper limit of SMALLINT column (32767)

---

**./src/common/value-defaults.js**
* New file - Contains default values for input numbers.
* Refer to database schema.

---

**./src/common/input-errors.js**
* Added new error type 'setNumberZeroError'.

---

**./src/processing/steps/field-validation/number-value.js**
* New file - Initial draft in previous commit.
* Functions to validate both decimal and whole numbers.
