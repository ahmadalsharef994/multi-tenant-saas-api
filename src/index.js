const express = require('express')
const app = express()
const port = process.env.PORT

const { getTenantModel } = require("./admindb");
const { getOrganizationModel } = require("./tenantdb");

app.get('/tenant', async (req, res) => {
    // this is to create a tenant in DB
    let tenantId = req.query.tenantId;
    let Tenant = await getTenantModel();
    const tenant = new Tenant({ id: tenantId, name: tenantId });
    let doc = await Tenant.findOneAndUpdate({ id: tenantId }, { id: tenantId, name: tenantId });
    if (!doc) {
        tenant.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }

    res.send(JSON.stringify(tenant))
})

app.get('/customer', async (req, res) => {
    let tenantId = req.query.tenantId;
    let customerName = req.query.customer;
    let Tenant = await getTenantModel();
    let tenant = await Tenant.findOne({ id: tenantId })
    if (!tenant)
        res.sendStatus(404) // tenant not found. Register tenant
    let Organization = await getOrganizationModel(tenantId);
    const customer = new Organization({ customerName });
    let doc = await Organization.findOneAndUpdate({ customerName }, { customerName });
    if (!doc) {
        customer.save(function (err) {
            // if (err) return handleError(err);
            // saved!
        });
    }

    res.send(JSON.stringify(customer))
})


app.listen(port, () => {
    console.log(`listening ${port}`)
})

//I am going to add/register two Tenant.
//Now I am goint to add customer for each tenant.