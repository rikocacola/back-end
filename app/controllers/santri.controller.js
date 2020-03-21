const Santri = require("../models/santri.model.js");

// Create
exports.create = ( req, res ) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      const santri = new Santri({
          nisSantri : req.body.nisSantri,
          nisnSantri : req.body.nisnSantri,
          namaSantri : req.body.namaSantri,
          nikSantri : req.body.nikSantri,
          tempatLahir : req.body.tempatLahir,
          tanggalLahir : req.body.tanggalLahir,
          agamaSantri : req.body.agamaSantri,
          kewarganegaraan : req.body.kewarganegaraan,
          jenisKelamin : req.body.jenisKelamin,
          alamatSantri : req.body.alamatSantri,
          anakKe: req.body.anakKe,
          jmlhSdrKandung : req.body.jmlhSdrKandung,
          noTelpRumah : req.body.noTelpRumah,
          noHP : req.body.noHP,
          email : req.body.email,
          tinggiBadan : req.body.tinggiBadan,
          beratBadan : req.body.beratBadan,
          asalSekolah : req.body.asalSekolah,
          tahunAngkatan : req.body.tahunAngkatan,
          statusAktif : req.body.statusAktif,
          idOrtu : req.body.idOrtu
      });
      Santri.create(santri, (err,data) =>{
          if (err)
          res.status(500).send({
              message:
              err.message || "Terjadi Error saat membuat data santri"
          });
          else res.send(data);
      });
};

// Get All
exports.findAll = ( req, res ) => {
    Santri.getAll(( err, data ) => {
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
    Santri.findById(req.params.nisSantri, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Santri dengan ID : ${req.params.nisSantri}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data santri dengan ID " + req.params.nisSantri
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
    Santri.updateById(req.params.nisSantri, new Santri(req.body), ( err, data ) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Santri dengan ID : ${req.params.nisSantri}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data Santri dengan ID " + req.params.nisSantri
                });
            }
        } else res.send(data);
    });
};

// Delete
exports.delete = ( req, res ) => {
    Santri.remove(req.params.nisSantri, ( err, data ) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Santri dengan ID : ${req.params.nisSantri}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data Santri dengan ID " + req.params.nisSantri
                });
            }
        } else res.send({message: `data Santri berhasil dihapus`})
    });
};