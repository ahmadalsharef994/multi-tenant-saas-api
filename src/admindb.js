const mongoose = require('mongoose');
const dbConnect = require('./mongoDB-connection');

const tenantSchema = new mongoose.Schema({
    id: Number,
    name: String
}, { timestamps: true })

const Tenant = mongoose.model("Tenant", tenantSchema);

let mongoDB;
const url = "mongodb+srv://admin:admin@cluster0.knadi.mongodb.net/admindb"; // URL of DB to store tenant details

const getDb = async () => {
    return mongoDB ? mongoDB : await connect(url)
}

const getTenantModel = async () => {
    const adminDb = await getDb();
    return adminDb.model("Tenant", tenantSchema)
}

module.exports = {
    getTenantModel
}