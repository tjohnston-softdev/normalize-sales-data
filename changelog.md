# Changelog

**./schema.sql**
* Added 'displayNumber' column to 'OrderItem'
	* Indicates the display order of rows when querying sales data.

---

**./src/processing/order-pass.js**
* handleItemAdd
	* 'rowIndex' parameter already exists, corresponding to display order.
	* Added 'rowIndex' to 'orderDetails.addItem' call.

---

**./src/processing/object-definition/order-details.js**
* addOrderItemRow
	* Added 'itemDisplay' parameter.
	* Added 'displayNumber' property to the end of 'newOrderItemObject'
