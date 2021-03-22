# Changelog

**sales_data_query.sql**
* Added the quarter, month, and year of the order date.
	* Inserted between 'OrderStatus.statusName' and 'ProductLine.productLineName'
* Added aliases to the following columns so that they better reflect the original data:
	* OrderStatus.statusName AS status
	* ProductLine.productLineName AS productLine
	* City.cityName AS city
	* StateRegion.stateName AS stateRegion
	* Country.countryName AS country
	* GlobalTerritory.territoryName AS territory
	* DealSize.dealSizeName AS dealSize
