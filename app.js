const express = require('express');
const { connection } = require('./db/server');
const fs = require('fs');
const yargs = require('yargs');

const app = express();
app.use(express.static(__dirname + '/data'));

var fileName = {
    describe: 'File name with extension',
    alias: 'file',
    required: true
}
var className = {
    describe: 'Class name',
    alias: 'class',
    required: true
}
var fnTeacher = {
    describe: 'Teacher first name',
    alias: 'firstname',
    required: true
}
var lnTeacher = {
    describe: 'Teacher last name',
    alias: 'lastname',
    required: true
}
var emailTeacher = {
    describe: 'Teacher email address',
    alias: 'email',
    required: true
}

const argv = yargs
    .command('addClass', 'Adds a class. 2 required arguments: file (not the path, just the name of the file with the extension) and classname', {
        file: fileName,
        className: className
    })
    .command('addTeacher', 'Adds a teacher. 3 required arguments: firstname, lastname, email.', {
        firstname: fnTeacher,
        lastname: lnTeacher,
        email: emailTeacher
    })
    .help()
    .argv;

var command = argv._[0]; 

if(command === 'addClass') {
    filepath = "./data/" + argv.file;
    className = argv.className;
    fs.readFile(filepath, function(err, data) {
        if(err) throw err;
        dataStr = data.toString();
        var studentsArray = dataStr.split(/\r?\n/);
        for (i = 0; i < studentsArray.length; i++) {
            var firstname = studentsArray[i].split(', ')[0];
            var lastname = studentsArray[i].split(', ')[1];
            console.log('ln : ' + lastname + ' fn : ' + firstname);        
            
            var sql = `INSERT INTO students (firstname, lastname, class) VALUES ('${firstname}', '${lastname}', '${className}')`;
            
            connection.query(sql, (err, student) => {
            if(err) throw err;
            // res.send(user);
            console.log(student);
            })
        }
    });
}

if(command === 'addTeacher') {
    firstname = argv.firstname;
    lastname = argv.lastname;
    email = argv.email;
    password = Math.random().toString(36).slice(-8);

    var sql = `INSERT INTO teachers (firstname, lastname, email, password) VALUES ('${firstname}', '${lastname}', '${email}', '${password}')`;
            
    connection.query(sql, (err, teacher) => {
    if(err) throw err;
    // res.send(user);
    console.log(teacher);
    })
}

app.get('/students', (req, res) => {
    var sql = 'SELECT * FROM students';
    connection.query(sql, (err, result) => {
    if (err) throw err;
        res.status(200).send(result);
    })
})
app.get('/student/:id_student', (req, res) => {
    id_student = req.params.id_student;
    var sql = 'SELECT * FROM students WHERE id_student = ?';
    connection.query(sql, [id_student], (err, result) => {
    if (err) throw err;
        res.status(200).send(result);
    })
})

app.get('/teachers', (req, res) => {
    var sql = 'SELECT * FROM teachers';
    connection.query(sql, (err, result) => {
    if (err) throw err;
        res.status(200).send(result);
    })
})

app.get('/teacher/:id_teacher', (req, res) => {
    id_teachers = req.params.id_teachers;
    var sql = 'SELECT * FROM students WHERE id_teachers = ?';
    connection.query(sql, [id_teachers], (err, result) => {
    if (err) throw err;
        res.status(200).send(result);
    })
})

app.get('/students/:classNameUrl', (req, res) => {


    classNameUrl = req.params.classNameUrl.split('-').join(' ');
    console.log('url : ' + classNameUrl + ' className : ' + classNameUrl);
    var sql = `SELECT * FROM students WHERE class = '${classNameUrl}'`;
    connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
    })
})


app.listen(3000, () => {
    console.log('Serveur écoutant le port 3000...');
})

// var addClass = () => {
    
    
// }
// var addTeacher = () => {
    
// }