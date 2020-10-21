const express = require('express');
const router = express.Router();
const uploadController= require('../controllers/upload-controller');
router.get('/upload',uploadController.uploadForm);
router.post('/upload',uploadController.uploadFile);
router.get('/download/:id',uploadController.downloadFile);
module.exports = router;