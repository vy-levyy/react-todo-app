## Todo

### Installing programs

Install [mysql](https://dev.mysql.com/doc/refman/8.0/en/installing.html),
[workbanch](https://docs.oracle.com/cd/E19078-01/mysql/mysql-workbench/wb-installing.html)
and [create database](https://docs.oracle.com/cd/E19078-01/mysql/mysql-workbench/wb-getting-started-tutorial.html).
Install [node.js](https://nodejs.org/en/download/)

### Opening the project

Download project. Run your code editor and open project folder

### Installing npm dependencies


Enter the following command in the terminal of the code editor:
```
npm run install-all
```
### Creating configs


Create an `.env` file in the frontend folder after installation.
Fill in the `.env` file according to the template located in the frontend folder of the `.env.example` file

Example:
```
// .env
REACT_APP_SERVER_HOST=http://localhost:3001
```

Create an `.env` file in the backend folder.
Fill in the .env file according to the template located in the backend folder of the `.env.example` file

Example:
```
// .env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=fsdaASr1t125bcvz6
DATABASE=todo
PORT=3001
ORIGIN=http://localhost:3000
```

### Starting the project

Enter the following command:
```
npm start
```

You will be able to access the app on http://localhost:3000