module.exports = app => {
    const ustadz = require("../controllers/ustadz.controller.js");
    const cors = require("cors");

    app.use(cors())

    // Create
    app.post("/postUstadz", ustadz.create);

    // Get All
    app.get("/getUstadz", ustadz.findAll);

    // Get One 
    app.get("/getUstadz/:niyUstadz", ustadz.findOne);

    // Update
    app.put("/editUstadz/:niyUstadz", ustadz.update);

    // delete
    app.delete("/deleteUstadz/:niyUstadz", ustadz.delete);
};
