SELECT
	OrderEntry.orderID,
	OrderItem.quantityOrdered,
	OrderItem.priceEach,
	OrderItem.itemNumber,
	(OrderItem.priceEach * OrderItem.quantityOrdered) AS totalCost,
	OrderEntry.orderDate,
	OrderStatus.statusName AS status,
	QUARTER(OrderEntry.orderDate) AS orderQuarter,
	MONTH(OrderEntry.orderDate) AS orderMonth,
	YEAR(OrderEntry.orderDate) AS orderYear,
	ProductLine.productLineName AS productLine,
	Product.msrp,
	Product.productCode,
	Customer.customerName,
	Customer.phoneNumber,
	Customer.addressLine1,
	Customer.addressLine2,
	City.cityName AS city,
	StateRegion.stateName AS stateRegion,
	Customer.postalCode,
	Country.countryName AS country,
	GlobalTerritory.territoryName AS territory,
	Customer.contactLastName,
	Customer.contactFirstName,
	DealSize.dealSizeName AS dealSize
FROM
	OrderEntry,
	OrderItem,
	OrderStatus,
	ProductLine,
	Product,
	Customer,
	City,
	StateRegion,
	Country,
	GlobalTerritory,
	DealSize
WHERE
	(OrderEntry.orderID = OrderItem.orderID) AND
	(OrderStatus.statusID = OrderEntry.statusID) AND
	(ProductLine.productLineID = Product.productLineID) AND
	(Product.productID = OrderItem.productID) AND
	(Customer.customerID = OrderEntry.customerID) AND
	(City.cityID = Customer.cityID) AND
	(StateRegion.stateID = City.stateID) AND
	(Country.countryID = StateRegion.countryID) AND
	(GlobalTerritory.territoryID = Country.territoryID) AND
	(DealSize.dealSizeID = OrderItem.dealSizeID)
ORDER BY OrderItem.displayNumber;