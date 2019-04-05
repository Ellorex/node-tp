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

var addClass = () => {
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
if(command === 'addClass') {
    addClass();
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


// var addClass = () => {
    
    
// }
// var addTeacher = () => {
    
// }