var mysql = require('mysql');
var mv = require('mv');
var sys = require('sys');
var exec = require('child_process').exec;
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

var fs = require('fs');
var tesseract = require('node-tesseract');

var vision = require('@google-cloud/vision');

var client = new vision.ImageAnnotatorClient();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cip'
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.register = function(req, res) {
    console.log("req", req.body);
    var users = {
        "username": req.body.usernamesignup,
        "email": req.body.emailsignup,
        "password": req.body.passwordsignup,
        "image":""
    };

    var child = exec("javac /home/saravanan/Documents/CIP/cip/*.java", function(error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error : ' + error);
        }
    });

    var child = exec("java KeyGen", function(error, stdout, stderr) {
        sys.print('stdout : ' + stdout);
        sys.print('stderr : ' + stderr);
        if (error !== null) {
            console.log('exec error : ' + error);
        }
    });

    setTimeout(function () {
        var child = exec("mv /home/saravanan/Documents/CIP/cip/key.png /home/saravanan/Documents/CIP/cip/project/uploads/"+users.username+".png", function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error : ' + error);
            }
        });

          users.image = '/home/saravanan/Documents/CIP/cip/project/uploads/'+users.username +'.png';
        // console.log("image : ",users.image);

        connection.query('INSERT INTO register SET ?', users, function(error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.sendFile(path.join(__dirname + '/404.html'));
            } else {
                console.log("Success!");
                res.sendFile(path.join(__dirname + '/mainpage.html'));
            }
        });
    },2000);

};


exports.login = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;
    //password = cryptr.encrypt(password);

    var textinimage = username+"##"+password;

    var text2png = require('text2png');
    fs.writeFileSync('out.png', text2png(textinimage, {textColor: 'black',fontSize:'100px sans-serif',bgColor:'white',padding:100}));



        var child = exec("javac /home/saravanan/Documents/CIP/cip/*.java", function(error, stdout, stderr) {
            //sys.print('stdout : ' + stdout);
            //sys.print('stderr : ' + stderr);
            if (error !== null) {
                console.log('exec error : ' + error);
            }
        });

    var keyimage = "";
    var decryptkeyimage = "";
    setTimeout(function() {
        connection.query('SELECT image FROM register WHERE username = ?', username, function(err, rows, fields) {
            if (err) {
                console.log("error ocurred", error);
                res.sendFile(path.join(__dirname + '/404.html'));
            } else {
                // console.log(rows[0].image);
                keyimage = "/home/saravanan/Documents/CIP/cip/project/uploads/" + username + ".png";
                decryptkeyimage = keyimage;

                var command = "java Encrypt " + " " + keyimage + "  " + "out.png";
                // console.log('\n\n');
                // console.log(command);
                // console.log('\n\n');
                var child = exec(command, function (error, stdout, stderr) {
                    sys.print('stdout : ' + stdout);
                    sys.print('stderr : ' + stderr);
                    if (error !== null) {
                        console.log('exec error : ' + error);
                    }
                })
            }
        });
    }, 500);

    setTimeout(function() {

        var command = "java Decrypt "+" "+keyimage+"  "+"crypt.png";
        // console.log('\n\n');
        // console.log("decrypt : ",command);
        // console.log('\n\n');
        var child = exec(command, function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error : ' + error);
            }

            // command = "rm /home/saravanan/Documents/CIP/cip/crypt.png /home/saravanan/Documents/CIP/cip/out.png";
            // var child = exec(command, function(error, stdout, stderr) {
            //     sys.print('stdout : ' + stdout);
            //     sys.print('stderr : ' + stderr);
            //     if (error !== null) {
            //         console.log('exec error : ' + error);
            //     }
            //    // res.send("Logged in!");
            // });

            var fileName = '/home/saravanan/Documents/CIP/cip/clean.png';

            client.textDetection(fileName)
                .then(function (results) {
                    var detections = results[0].textAnnotations;
                    //    console.log('Text:');
                    var extractedtext = "";
                    detections.forEach(function (text) {
                           console.log("text : ",text.description);
                        if (extractedtext === "")
                            extractedtext = text.description;
                    });
            //     });
            //
            // tesseract.process(fileName,function(err,extractedtext) {
            //     if(err) {
            //         console.error(err);
            //     } else {
            //         console.log(extractedtext);
            //     }

                   // console.log("ocr : ",extractedtext);
                 //   console.log('\n');
                    var userpass = extractedtext.split('##');
                    console.log(userpass[0]+userpass[1]);
                    userpass[0] =userpass[0].trim();
                    userpass[1] =userpass[1].trim();
                    setTimeout(function() {
                        connection.query('SELECT * FROM register WHERE username = ? AND password= ?',[userpass[0],userpass[1]], function(err, rows, fields) {
                            if (err) {
                                res.sendFile(path.join(__dirname + '/404.html'));

                            } else {

                                 console.log(rows);
                                // res.send("HELLO");
                                if(rows === undefined || rows[0] === undefined || rows === " "|| rows[0] === " "){
                                    console.log("error ocurred", error);
                                    res.sendFile(path.join(__dirname + '/404.html'));
                                }
                                else {
                                    console.log("Success!");
                                    res.sendFile(path.join(__dirname + '/main_index.html'));
                                }
                            }

                        });
                    }, 500);


                });
        });

    }, 8000);


};


