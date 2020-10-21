const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const port =  5000;

var uploadRouter = require('./routes/upload-route');
app.use(fileUpload());

app.use('/', uploadRouter);
app.listen(port);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/upload-form.html');
});