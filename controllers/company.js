const Company = require('../models/company');

exports.addCompany = async (req, res) => {
    try {
        const { name, contactDetails, size, industry, notes } = req.body;

        const company = await req.user.createCompany({ name, contactDetails, size, industry, notes });
        res.status(201).json(company);
    } catch (error) {
        console.log('Error adding company:', error);
        res.status(500).json({ error: 'Failed to add company' });
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await req.user.getCompanies();
        res.status(200).json(companies);
    } catch (error) {
        console.log('Error getting companies:', error);
        res.status(500).json({ error: 'Failed to get companies' });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const companyId = parseInt(req.params.id,10);
        const { name, contactDetails, size, industry, notes } = req.body;

        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        company.name = name;
        company.contactDetails = contactDetails;
        company.size = size;
        company.industry = industry;
        company.notes = notes;
        await company.save();

        res.status(200).json(company);
    } catch (error) {
        console.log('Error updating company:', error);
        res.status(500).json({ error: 'Failed to update company' });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const companyId = parseInt(req.params.id,10);

        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        await company.destroy();
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.log('Error deleting company:', error);
        res.status(500).json({ error: 'Failed to delete company' });
    }
};
