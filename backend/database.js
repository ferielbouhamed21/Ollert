const mysql = require('mysql2');

// Connecting to the database, and exporting it.
db = module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ollert'
});

const initialQueries = () => {
    // WARNING: DO NOT CHANGE WHAT HAS BEEN ALREADY PUSHED
    // INSTEAD, ADD OTHER QUERIES THAT CANCEL WHAT IS ALREADY
    // EXECUTED.
    db.promise().query(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            role VARCHAR(50) NOT NULL DEFAULT 'MEMBRE' check (ROLE in ('CHEF', 'MEMBRE')),
            picture VARCHAR(255),
            PRIMARY KEY(id)
        )`
    );
   db.promise().query(`
        CREATE TABLE IF NOT EXISTS projects (
        id INTEGER NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        description TEXT,
        deadline DATE,
        id_project_manager INTEGER NOT NULL references users,
        PRIMARY KEY(id)
    )`
   );
   db.promise().query(`
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        state VARCHAR(50) ,
        description TEXT,
        deadline DATE,
        id_user INTEGER references users,
        id_project INTEGER NOT NULL references projects ,
        PRIMARY KEY(id)
    )`
   )
   db.promise().query(`
        CREATE TABLE IF NOT EXISTS project_user (
            id_user INTEGER NOT NULL references users ,
            id_project INTEGER NOT NULL references projects 
        )
    `
    )

    // EXAMPLE: I figured that the users table needs to be dropped,
    // let's not delete the above query, but rather add this query 
   
    // NOTE: Add other queries below.

};


// NOTE: Do not change, rather change initialQueries
try{
    initialQueries();
}catch(err){
    console.error(err);
}