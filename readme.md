# Normalize Sales Data

This Node JS command line application takes a CSV set of [sales data](https://www.kaggle.com/kyanyoga/sample-sales-data) and restructures it to fit a normalized database that I designed based on the data. The normalized data is then saved either as a CSV or SQL file for each corresponding table.

---


## Getting Started
After downloading this project, open a terminal inside the root folder and run `npm install`. Execute `node convert <file-type>` to run the program. The allowed file types are CSV and SQL, indicating the output file type. The normalized data files are saved in the 'output-files' folder.


---

## Running The Database
This project also contains a fully functional database based on the normalized design. There is an option to output normalized data as SQL files that insert data for the corresponding table.

1. Start a MySQL instance of your choice and run `schema.sql`.
2. In the project folder, run `node convert sql` to normalize the data and output as SQL files.
3. In your MySQL instance, run the SQL files in the 'output-files' folder. Each SQL file corresponds to a table and should be executed in order of table definition. If you insert the table data out of order, you might get an error.

---

## Documentation
* [Data Source](https://www.kaggle.com/kyanyoga/sample-sales-data)
* [ER Diagram](./relational-diagram/sales.svg)
* [Database Definition](./schema.sql)
* [Data Query](./sales_data_query.sql)
* [Inspiration](./info/inspiration.md)
* [Column Mapping](./info/col-map.md)

---

## Disclaimer
The original data set was licensed under [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/au/). Therefore, I have decided to use the same for this project.
