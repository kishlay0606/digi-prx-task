var multer = require('multer');
module.exports.file={
    storage:function(){
        const storage = multer.diskStorage(
            {
              destination: (req, file, callback) => {
                callback(null, __dirname + '/public/uploads');
              }
            }
          );
      return storage;
},




allowedfile:function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|pdf|docx|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image and pdf files are allowed!';
        return cb(new Error('Only image and pdf files are allowed!'), false);
    }
    cb(null, true);
}
}
