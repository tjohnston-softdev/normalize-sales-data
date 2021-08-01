### Column Mapping

The table below indicates what each column in the original input file corresponds to in the normalized database schema. 

| Original | Normalized | Notes |
|---|---|---|
| (row number) | OrderItem(displayNumber) | Displays data in original order for sales query |
| ORDERNUMBER | OrderEntry(orderID) |  |
| QUANTITYORDERED | OrderItem(quantityOrdered) |  |
| PRICEEACH | OrderItem(priceEach) |  |
| ORDERLINENUMBER | OrderItem(itemNumber) |  |
| SALES |  | Calculated dynamically: OrderItem(quantityOrdered * priceEach) |
| ORDERDATE | OrderEntry(orderDate) |  |
| STATUS | OrderStatus(statusName) |  |
| QTR_ID |  | Uses QUARTER function on OrderEntry(orderDate) |
| MONTH_ID |  | Uses MONTH function on OrderEntry(orderDate) |
| YEAR_ID |  | Uses YEAR function on OrderEntry(orderDate) |
| PRODUCTLINE | ProductLine(productLineName) |  |
| MSRP | Product(msrp) |  |
| PRODUCTCODE | Product(productCode) |  |
| CUSTOMERNAME | Customer(customerName) |  |
| PHONE | Customer(phoneNumber) |  |
| ADDRESSLINE1 | Customer(addressLine1) |  |
| ADDRESSLINE2 | Customer(addressLine2) |  |
| CITY | City(cityName) |  |
| STATE | StateRegion(stateName) |  |
| POSTALCODE | Customer(postalCode) |  |
| COUNTRY | Country(countryName) |  |
| TERRITORY | GlobalTerritory(territoryName) |  |
| CONTACTLASTNAME | Customer(contactLastName) |  |
| CONTACTFIRSTNAME | Customer(contactFirstName) |  |
| DEALSIZE | DealSize(dealSizeName) |  |


---

[Return to index](../readme.md)