
## steps to run

1) You need a mysql database set up and running on your computer

1) Fill in the values in the .env file with your database name and credentials

1) run `node demo.js`, notice the SQL statements in the console that sequelize executes on your behalf

1) Use the database client of your choice (mysql workbench, adminer, etc...) to view the created tables and records in the tables

*how to learn*
in the file demo.js I've included links to Sequelize documentation which was consulted to write the code   
you should navigate to each of those links and read in depth about each concept yourself 


## next steps

see if using sequelize you can...
- define some models for remarkable times
- define a many to many association HINT: https://sequelize.org/master/manual/assocs.html#many-to-many-relationships
- save some records in the database
- query to retrieve saved records 