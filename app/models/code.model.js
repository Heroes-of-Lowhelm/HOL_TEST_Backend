const sql = require("./db.js");

// Constructor
const Code = function (code) {
    this.verification_code = code.verification_code;
    this.mail = code.mail;
}

Code.create = (newCode, result) => {
    sql.query("INSERT INTO codes (mail,verification_code) VALUES ( ? , ? ) ON DUPLICATE KEY UPDATE verification_code=VALUES(verification_code)",
        [newCode.mail, newCode.verification_code],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("generated new code: ", { ...newCode });
            result(null, { ...newCode });
        })
}
Code.findByMail = (mail, result) => {
    sql.query(`SELECT * FROM codes WHERE mail = "${mail}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found code with the user id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Code;