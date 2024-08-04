const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const companyController = require('../controllers/company');

router.post('/addcompany', authenticate, companyController.addCompany);
router.get('/getcompanies', authenticate, companyController.getAllCompanies);
router.put('/updatecompany/:id', authenticate, companyController.updateCompany);
router.delete('/deletecompany/:id', authenticate, companyController.deleteCompany);

module.exports = router;