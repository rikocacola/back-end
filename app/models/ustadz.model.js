const sql = require("./db.js");

// Contructor
const Ustad = function(ustad) {
    this.niyUstadz = ustad.niyUstadz;
    this.namaUstadz = ustad.namaUstadz;
    this.nikUstadz = ustad.nikUstadz;
    this.tempatLahirUstadz = ustad.tempatLahirUstadz;
    this.tanggalLahirUstadz = ustad.tanggalLahirUstadz;
    this.agamaUstadz = ustad.agamaUstadz;
    this.kewarganegaraan = ustad.kewarganegaraan;
    this.jenisKelamin = ustad.jenisKelamin;
    this.alamatUstadz = ustad.alamatUstadz;
    this.noHP = ustad.noHP;
    this.email = ustad.email;
    this.pendidikanUstadz = ustad.pendidikanUstadz;
    this.statusAktif = ustad.statusAktif;
};

// Input Data
Ustad.create = (ustadBaru, result) => {
    sql.query(`INSERT INTO ustadz SET ?`, ustadBaru, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }
        console.log("Data Terbuat: ", {niyUstadz: res.niyUstadz, ...ustadBaru});
        result(null, {niyUstadz: res.niyUstadz, ...ustadBaru})
    });
};


// Get Data by ID
Ustad.findById = (niyUstadz, result) => {
    sql.query(`SELECT * FROM ustadz WHERE niyUstadz = ${niyUstadz}`, (err,res) => {
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
    });;
};

// Get All Data
Ustad.getAll = (result) => {
    sql.query(`SELECT * from ustadz`, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Ustadz : ", res);
        result(null, res);
    });
};

// Update By ID
Ustad.updateById = (niyUstadz, ustad, result) => {
    sql.query(
        `UPDATE ustadz SET namaUstadz = ?, nikUstadz = ?, tempatLahirUstadz = ?, tanggalLahirUstadz= ?, agamaUstadz = ?, 
        kewarganegaraan = ?, jenisKelamin = ?, alamatUstadz = ?, noHP = ?, email = ?, pendidikanUstadz = ?, statusAktif = ?
        WHERE niyUstadz = ?`, 
        [
            ustad.namaUstadz, ustad.nikUstadz, ustad.tempatLahirUstadz, ustad.tanggalLahirUstadz, ustad.agamaUstadz, ustad.kewarganegaraan, 
            ustad.jenisKelamin, ustad.alamatUstadz, ustad.noHP, ustad.email, ustad.pendidikanUstadz, ustad.statusAktif, niyUstadz
        ], (err,res) => {
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
            console.log("data ustadz telah diperbarui : ", {niyUstadz: niyUstadz, ...ustad});
            result(null,{niyUstadz: niyUstadz, ...ustad});
        });
};

// Delete Data Ustadz
Ustad.remove = (niyUstadz, result) => {
    sql.query(`DELETE FROM ustadz WHERE niyUstadz = ?`, niyUstadz, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`data ustadz terhapus ${res.affectedRows}`);
        result(null, res);
    })
}

module.exports = Ustad;