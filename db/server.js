const mysql = require('mysql');

//Connexion au server SQL
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'node-tp',
    user: 'root',
    password: ''
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connecté à mysql');
})

module.exports = {
    connection
}