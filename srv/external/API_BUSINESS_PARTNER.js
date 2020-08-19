module.exports = srv => {
    // Mock events for s4
    srv.on("CREATE", req => {
        const payload = JSON.stringify({event: "CREATED", objectId: req.data.BusinessPartner});
        srv.emit("BusinessPartner/Created", payload);
        console.log('<< event emitted', payload);
    });

    srv.on("UPDATE", req => {
        const payload = JSON.stringify({event: "CHANGED", objectId: req.data.BusinessPartner});
        srv.emit("BusinessPartner/Changed", payload);
        console.log('<< event emitted', payload);
    });
}