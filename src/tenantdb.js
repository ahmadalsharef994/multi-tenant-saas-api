const { connect } = require('./mongoDB-connection');
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    customerName: String
}, { timestamps: true })

const Organization = mongoose.model("Organization", organizationSchema)


const url = process.env.MONGODB_URL; // URL of root DB to store each Tenant
let mongoDB;

const getTenantDB = async (tenantId) => {
    const dbName = `tenant-${tenantId}`; // orgId
    mongoDB = mongoDB ? mongoDB : await connect(url)
    let tenantDb = mongoDB.useDb(dbName, { useCache: true });
    return tenantDb;
}

const getOrganizationModel = async (tenantId) => {
    // how to do this which each model
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("Organization", organizationSchema)
}

module.exports = {
    getOrganizationModel
}