const cds = global.cds || require('@sap/cds')
module.exports = async srv => {
    const messaging = await cds.connect.to('messaging')
    // Mock events for s4
    srv.on("CREATE", async (req, next) => {
        const result = await next();
        const payload = JSON.stringify({event: "CREATED", objectId: req.data.BusinessPartner});
        const msgTx = messaging.tx(req)
        msgTx.emit("refappscf/ecc/123/BO/BusinessPartner/Created", payload);
        console.log('<< event emitted', payload);
        return result;
    });

    srv.on("UPDATE", async (req, next) => {
        const result = await next();
        const payload = JSON.stringify({event: "CHANGED", objectId: req.data.BusinessPartner});
        const msgTx = messaging.tx(req)
        msgTx.emit("refappscf/ecc/123/BO/BusinessPartner/Changed", payload);
        console.log('<< event emitted', payload);
        return result;
    });
}