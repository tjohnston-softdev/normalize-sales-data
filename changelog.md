# Changelog

**./convert.js**
* On successful result, display first order object.

---

**./src/proc-data.js**
* Added requirement for './processing/order-pass'
* Updated 'orderSort' call to include 'fullResultObject.canContinue'
* Added call to 'orderPass' in 'coordinateDataProcessing' after the data has been sorted.

---

**./src/processing/general-pass.js loopDataRows**
* Renamed variables:
	* 'currentOrderNumber' to 'currentOrder'
	* 'currentDealSize' to 'currentDeal'
	* 'currentOrderStatus' to 'currentStatus'
* Updated 'remainCols' call to include 'rowIndex'

---

**./src/processing/order-sort.js**
* Renamed the 'sortDataRows' function to 'performSorting'
* 'performSorting' is a private function.
* Renamed 'origData' parameter in 'performSorting to 'rList'
* Wrote new function 'sortPreparedDataRows'
	* Used to call 'performSorting' if the general pass has completed safely.
	* Public function as 'sortRows' (The name itself is unchanged)

---

**./src/processing/order-pass.js**
* New file. - Used to normalize order data.

---

**./src/processing/field-validation/remain-cols.js**
* Added 'rowInd' parameter - Row index.
* Added result property 'originalIndex' - Uses 'rowInd'
* Renamed existing result properties to their respective column names:
	* 'quantityCol' to 'QUANTITYORDERED'
	* 'priceCol' to 'PRICEEACH'
	* 'orderDateCol' to 'ORDERDATE'

---

**./src/processing/field-validation/date-value.js**
* New file - Used to validate date strings.
* This only applies to the order date.

---

**./src/processing/field-validation/order-details.js**
* New file - Used to add order entries to the result data set.

---

**./src/common/input-errors.js**
* Added definition for Date Format error.
