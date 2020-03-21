module.exports = app => {
    const santris = require("../controllers/santri.controller.js");
    const cors = require("cors");

    app.use(cors())

    // Create
    app.post("/postSantri", santris.create);

    // Get All
    app.get("/getSantri", santris.findAll);

    // Get One 
    app.get("/getSantri/:nisSantri", santris.findOne);

    // Update
    app.put("/editSantri/:nisSantri", santris.update);

    // delete
    app.delete("/deleteSantri/:nisSantri", santris.delete);
};
