# FaceRecognition Project
Repository to upload the facerecognition project (back-end) and explain how to run it on **macOS**.

## How to run the project (back-end)
* Open the terminal.
* Clone the repository: **`git clone https://github.com/jemtca/facerecognition-back-end.git`**
* Go to the project folder: **`cd facerecognition-back-end`**
* Install dependencies/packages: **`npm install`**
* Run the app: **`npm start`**

## How to install postgresql (using Homebrew) and create a database
* Install postgresql: **`brew install postgresql`**
* Start postgresql: **`brew services start postgresql`**
* Create a database: **`createdb 'facerecognition'`**
* Connect to the database: **`psql 'facerecognition'`**
* Create users table: **`CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email TEXT UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);`**
* Create login table: **`CREATE TABLE login (id SERIAL PRIMARY KEY, hash VARCHAR(100) NOT NULL, email TEXT UNIQUE NOT NULL);`**
* Useful commands
    * List all databases: **`\l`**
	* Show tables in the database: **`\d`**
	* Show table information: **`table table_name;`**
	* Exit postgresql: **`\q`**

## How to run the whole project (database + back-end + front-end)
* Recomendation: open three different terminal windows.
* Database window
    * Start postgresql: **`brew services start postgresql`**
    * Connect to the database: **`psql 'facerecognition'`**
* Back-end window: **`npm start`**
* Front-end window: **`npm start`**

## How to stop the whole project (database + back-end + front-end)
* Stop the front-end: **`control + c`**
* Stop the back-end: **`control + c`**
* Stop postgresql: **`\q`** + **`brew services stop postgresql`**

## IMPORTANT
* You must have your own API key to connect to [Clarifai](https://www.clarifai.com/) and add it in the **`controllers/image.js`**.
* The API supports the most common image formats: JPEG, PNG, BMP, TIFF, WEBP.

## Screenshot
![](https://github.com/jemtca/facerecognition-back-end/blob/master/screenshots/facerecognition.gif)
