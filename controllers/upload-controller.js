var multer = require('multer');
const fileUpload = require('express-fileupload');
const fs = require('fs');


const express = require('express');
require('../app');


var fileupload = require('../config/file-upload');
module.exports = {


    uploadForm: function (req, res) {
        if (req.files === null) {
            console.log("no file uploades")

            return res.status(400).json({ msg: 'No file was uploaded' });
        }
        else
            res.sendFile('../views/upload-form.html');
    },



    uploadFile: function (req, res) {
        try {
            var maxSize = 20 * 1000 * 1000;

            var storage = multer.diskStorage({
                destination: function (req, file, callback) {

                    callback(null, __dirname + '/public/uploads');
                },
                filename: function (req, file, callback) {

                    callback(null, file.originalname);
                },
                onFileUploadStart: function (file, req, res) {
                    if (req.files.file.length > maxSize) {
                        return false;
                    }
                }

            });

            var upload = multer({
                storage: storage,
                limits: { fileSize: 20 * 1024 * 1024 }
            }).single('file');



            console.log(req.files);
            if (req.files === null) {
                console.log("no file uploades")
                return res.status(400).json({ msg: 'No file was uploaded' });
            }
            if (req.files.file.size > maxSize) {
                return res.status(400).json({ msg: 'file greate than 20 mb' });

            }
            upload(req, res, function (err) {
                if (err) {
                    console.log(err);

                    // return res.end("Error uploading file.");
                }

                
                else {
                    console.log(req.files)
                    const file = req.files.file;
                    console.log(file);


                    file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }

                        console.log(file.name);
                        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
                    });
                }
            });
        }
        catch (e) {
            console.log("upload - catch block");
            console.log(e);
            return res.status(400).json({ success: 'False', msg: 'No file was selected' });

            //res.render('error.hbs', { error: "Oops! Something went wrong"});
        }


    },

    downloadFile: function (req, res) {
        console.log("ab")

        try {
            console.log("ab")
            let savedName = req.params.id;
            console.log(savedName);
            const file = `${__dirname}/public/uploads/${savedName}`;
            console.log(file);
            res.download(file, savedName, (err) => {
                if (err) {
                    console.log("Couldn't send file");
                    //res.json( "file can not be downloaded twice");
                    res.status(400).json({ success: 'False', msg: 'invalid link' });

                }
                else {

                    fs.unlink(file, (err) => {
                        if (err) {
                            console.log(err);
                        }



                    });
                }
            });
        }
        catch (e) {

            console.log("download - catch block");
            console.log(e);
            res.json("Oops! Something went wrong");
        }

    }

}