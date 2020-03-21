module.exports = app => {
    const kelass = require("../controllers/kelas.controller.js");
    const cors = require("cors");

    app.use(cors())

    // Create
    app.post("/postKelas", kelass.create);

    // Get All
    app.get("/getKelas", kelass.findAll);

    // Get One 
    app.get("/getKelas/:idKelas", kelass.findOne);

    // Update
    app.put("/editKelas/:idKelas", kelass.update);

    // delete
    app.delete("/deleteKelas/:idKelas", kelass.delete);
};
