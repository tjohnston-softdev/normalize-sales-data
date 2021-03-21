SELECT
	OrderEntry.orderID,
	OrderItem.quantityOrdered,
	OrderItem.priceEach,
	OrderItem.itemNumber,
	(OrderItem.priceEach * OrderItem.quantityOrdered) AS totalCost,
	OrderEntry.orderDate,
	OrderStatus.statusName,
	ProductLine.productLineName,
	Product.msrp,
	Product.productCode,
	Customer.customerName,
	Customer.phoneNumber,
	Customer.addressLine1,
	Customer.addressLine2,
	City.cityName,
	StateRegion.stateName,
	Customer.postalCode,
	Country.countryName,
	GlobalTerritory.territoryName,
	Customer.contactLastName,
	Customer.contactFirstName,
	DealSize.dealSizeName
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