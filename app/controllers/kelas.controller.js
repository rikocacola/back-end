const Kelas = require("../models/kelas.model.js");

// Create
exports.create = ( req, res ) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      const kelas = new Kelas({
          idKelas : req.body.idKelas,
          namaKelas : req.body.namaKelas,
          nisSantri : req.body.nisSantri,
          niyUstadz : req.body.niyUstadz,
          idTA : req.body.idTA
      });
      Kelas.create(kelas, (err,data) =>{
          if (err)
          res.status(500).send({
              message:
              err.message || "Terjadi Error saat membuat data kelas"
          });
          else res.send(data);
      });
};

// Get All
exports.findAll = ( req, res ) => {
    Kelas.getAll(( err, data ) => {
        if (err) 
        res.status(500).send({
            message:
            err.message || "Terjadi Error"
        });
        else res.send(data);
    })
};

// Get one by id
exports.findOne = ( req, res ) => {
    Kelas.findById(req.params.idKelas, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Kelas dengan ID : ${req.params.idKelas}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data kelas dengan ID " + req.params.idKelas
                });
            }
        } else res.send(data);
    });
}

// Update by ID
exports.update = ( req, res ) => {
    if (!req.body) {
        res.status(400).send({
            message: "Tidak boleh kosong!"
        });
    }
    Kelas.updateById(req.params.idKelas, new Kelas(req.body), ( err, data ) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Kelas dengan ID : ${req.params.idKelas}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data Kelas dengan ID " + req.params.idKelas
                });
            }
        } else res.send(data);
    });
};

// Delete
exports.delete = ( req, res ) => {
    Kelas.remove(req.params.idKelas, ( err, data ) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Kelas dengan ID : ${req.params.idKelas}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data Kelas dengan ID " + req.params.idKelas
                });
            }
        } else res.send({message: `data Kelas berhasil dihapus`})
    });
};