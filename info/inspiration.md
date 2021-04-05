### Inspiration
When I was going through the pre-selection process for the Telstra Neurodiversity Program 2021, I was asked to complete a couple of technical assessments. One of them was designed to get an idea of my ability to work with data. The objective was to create an MS Excel dashboard from a supplied set of sales data. It was very open-ended as to what a dashboard is but the basic principle is to provide a summary overview of the data and the ability to drill down as needed. For example, you could display the total generated revenue with different filter options.

The input data file was simply one large spreadsheet with no real structure. While most of the columns were easy enough to understand, there were some things that took time for me to comprehend. I did some Googling for similar data sets so that I can get some additional context but I quickly discovered that this data was publicly available and hosted on [Kaggle](https://www.kaggle.com/kyanyoga/sample-sales-data). It is almost as if that the assessor chose some random data set and quickly threw together an assessment based around it. There is certainly nothing wrong with that but I found it to be a little anticlimactic.

> Sample Sales Data, Order Info, Sales, Customer, Shipping, etc., Used for Segmentation, Customer Analytics, Clustering and More. Inspired for retail analytics. This was originally used for Pentaho DI Kettle, But I found the set could be useful for Sales Simulation training.
> 
> Originally Written by María Carina Roldán, Pentaho Community Member, BI consultant (Assert Solutions), Argentina. This work is licensed under the Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License. Modified by Gus Segura June 2014.

Based on the description, it is clear that although the data was simulated, it still provides a realistic picture of what sales data actually looks like. Say what you want about the assessment but I appreciate the realism behind it. Looking at the discussion board for this set, I was relieved that I was not the only one having trouble making sense of it at first. After reading these posts and examining the data, I was ready to attempt this assessment.

There isn't really that much for me to say about my submission. I interpreted the requirements as best I could and submitted something I am somewhat happy with. While the assessment was open-ended enough to allow liberties, I made an effort to modify the source data as little as possible (if at all). I have since gone on to [complete](https://github.com/tjohnston-softdev/telstra-neurodiv-net-soft-eng-21) the neurodiversity program so I clearly did okay, but I still had to work with that flat set of data and a part of me wanted to clean it up. I don't know if this was part of my neurology or my background in database design but all the same, I felt like I had to do something.

I did this primarily as a personal exercise in my free time. Hence, it was entirely separate from the neurodiversity program and the Excel assessment. First, I designed a normalized database based on the source input. Then, I wrote a command line application to read, normalize, and output the data. Output can be written as either CSV or SQL files, with one file for each table. I have also included a [diagram](../relational-diagram/sales.svg) depicting the database design, a SQL file for the [schema](../schema.sql), and a [query](../sales_data_query.sql) that displays the data as it was in the original file.

---

[Return to index](../readme.md)