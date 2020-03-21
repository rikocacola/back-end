const Ustad = require("../models/ustadz.model.js");

// Create
exports.create = ( req, res ) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      const ustad = new Ustad({
          niyUstadz : req.body.niyUstadz,
          namaUstadz : req.body.namaUstadz,
          nikUstadz : req.body.nikUstadz,
          tempatLahirUstadz : req.body.tempatLahirUstadz,
          tanggalLahirUstadz : req.body.tanggalLahirUstadz,
          agamaUstadz : req.body.agamaUstadz,
          kewarganegaraan : req.body.kewarganegaraan,
          jenisKelamin : req.body.jenisKelamin,
          alamatUstadz : req.body.alamatUstadz,
          noHP : req.body.noHP,
          email : req.body.email,
          pendidikanUstadz : req.body.pendidikanUstadz,
          statusAktif : req.body.statusAktif
      });
      Ustad.create(ustad, (err,data) =>{
          if (err)
          res.status(500).send({
              message:
              err.message || "Terjadi Error saat membuat data ustadz"
          });
          else res.send(data);
      });
};

// Get All
exports.findAll= (req, res) => {
    Ustad.getAll((err, data) => {
        if (err) 
        res.status(500).send({
            message:
            err.message || "Terjadi Error"
        });
        else res.send(data);
    })
};

// Get one by ID
exports.findOne = ( req, res ) => {
    Ustad.findById(req.params.niyUstadz, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Ustadz dengan ID : ${req.params.niyUstadz}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data ustadz dengan ID " + req.params.niyUstadz
                });
            }
        } else res.send(data);
    });
};

// Update by ID
exports.update = ( req ,res ) => {
    if (!req.body) {
        res.status(400).send({
            message: "Tidak boleh kosong!"
        });
    }
    Ustad.updateById(req.params.niyUstadz, new Ustad(req.body), ( err, data ) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Ustadz dengan ID : ${req.params.niyUstadz}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data ustadz dengan ID " + req.params.niyUstadz
                });
            }
        } else res.send(data);
    }
    )
}

exports.delete = ( req, res ) => {
    Ustad.remove(req.params.niyUstadz, ( err, data ) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Ustadz dengan ID : ${req.params.niyUstadz}. tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: "Error saat mengambil data ustadz dengan ID " + req.params.niyUstadz
                });
            }
        } else res.send({message: `data ustadz berhasil dihapus`})
    })
}