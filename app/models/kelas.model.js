const sql = require("./db.js");

// Constructor
const Kelas = function(kelas) {
    this.idKelas = kelas.idKelas;
    this.namaKelas = kelas.namaKelas;
    this.nisSantri = kelas.nisSantri;
    this.niyUstadz = kelas.niyUstadz;
    this.idTA = kelas.idTA;
}

// Input Data
Kelas.create = (kelasBaru, result) => {
    sql.query(`INSERT INTO kelas SET ?`, kelasBaru, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }
        console.log("Data Terbuat: ", {idKelas: res.insertidKelas, ...kelasBaru});
        result(null, {idKelas: res.insertidKelas, ...kelasBaru})
    });
};

// Get Data by ID
Kelas.findById = (idKelas, result) => {
    sql.query(`SELECT * FROM kelas WHERE idKelas = ${idKelas}`, ( err, res ) => {
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
Kelas.getAll = (result) => {
    sql.query(`SELECT * FROM kelas`, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Kelas : ", res);
        result(null, res);
    });
};

// Update by ID
Kelas.updateById = (idKelas, kelas, result) => {
    sql.query(
        `UPDATE kelas SET
        namaKelas = ?, nisSantri = ?, niyUstadz = ?, idTA = ?
        WHERE idKelas = ?`,
        [   
            kelas.namaKelas, kelas.nisSantri, kelas.niyUstadz, kelas.idTA, idKelas
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
            console.log("data kelas telah diperbarui : ", {idKelas: idKelas, ...kelas});
            result(null,{idKelas: idKelas, ...kelas});
        });
};

// Delete Data
Kelas.remove = ( idKelas, result ) => {
    sql.query(`DELETE FROM kelas WHERE idKelas = ?`, idKelas, ( err, res ) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`data kelas terhapus ${res.affectedRows}`);
        result(null, res);
    })
}

module.exports = Kelas;
