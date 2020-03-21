const sql = require("./db.js");

// Constructor
const Santri = function(santri) {
    this.nisSantri = santri.nisSantri;
    this.nisnSantri = santri.nisnSantri;
    this.namaSantri = santri.namaSantri;
    this.nikSantri = santri.nikSantri;
    this.tempatLahir = santri.tempatLahir;
    this.tanggalLahir = santri.tanggalLahir;
    this.agamaSantri = santri.agamaSantri;
    this.kewarganegaraan = santri.kewarganegaraan;
    this.jenisKelamin = santri.jenisKelamin;
    this.alamatSantri = santri.alamatSantri;
    this.anakKe = santri.anakKe;
    this.jmlhSdrKandung = santri.jmlhSdrKandung;
    this.noTelpRumah = santri.noTelpRumah;
    this.noHP = santri.noHP;
    this.email = santri.email;
    this.tinggiBadan = santri.tinggiBadan;
    this.beratBadan = santri.beratBadan;
    this.asalSekolah = santri.asalSekolah;
    this.tahunAngkatan = santri.tahunAngkatan;
    this.statusAktif = santri.statusAktif;
    this.idOrtu = santri.idOrtu;
}

// Input Data
Santri.create = (santriBaru, result) => {
    sql.query(`INSERT INTO santri SET ?`, santriBaru, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }
        console.log("Data Terbuat: ", {nisSantri: res.insertNisSantri, ...santriBaru});
        result(null, {nisSantri: res.insertNisSantri, ...santriBaru})
    });
};

// Get Data by ID
Santri.findById = (nisSantri, result) => {
    sql.query(`SELECT * FROM santri WHERE nisSantri = ${nisSantri}`, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("ditemukan: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found 
        result({ kind: "not_found"}, null);
    });
};

// Get All Data
Santri.getAll = (result) => {
    sql.query(`SELECT * FROM santri`, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Santri : ", res);
        result(null, res);
    });
};

// Update by ID
Santri.updateById = (nisSantri, santri, result) => {
    sql.query(
        `UPDATE santri SET
        nisnSantri = ?, namaSantri = ?, nikSantri = ?,
        tempatLahir = ?, tanggalLahir = ?,
        agamaSantri = ?, kewarganegaraan = ?, jenisKelamin = ?, alamatSantri = ?,
        anakKe = ?, jmlhSdrKandung = ?, noTelpRumah = ?, noHP = ?,
        email = ?, tinggiBadan = ?, beratBadan = ?, asalSekolah = ?,
        tahunAngkatan = ?, statusAktif = ?, idOrtu = ? 
        WHERE nisSantri = ?`,
        [
            santri.nisnSantri, santri.namaSantri, santri.nikSantri,
            santri.tempatLahir, santri.tanggalLahir, santri.agamaSantri, 
            santri.kewarganegaraan, santri.jenisKelamin, santri.alamatSantri,
            santri.anakKe, santri.jmlhSdrKandung, santri.noTelpRumah, santri.noHP,
            santri.email, santri. tinggiBadan, santri.beratBadan, santri.asalSekolah,
            santri.tahunAngkatan, santri.statusAktif, santri.idOrtu, nisSantri
        ], ( err, res ) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("data santri telah diperbarui : ", {nisSantri: nisSantri, ...santri});
            result(null,{nisSantri: nisSantri, ...santri});
        });
};

// Delete Data
Santri.remove = ( nisSantri, result ) => {
    sql.query(`DELETE FROM santri WHERE nisSantri = ?`, nisSantri, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`data santri terhapus ${res.affectedRows}`);
        result(null, res);
    })
}

module.exports = Santri;
