const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "qlsinhvien"
    });

    con.connect(err => {
        if (err) throw err;
        con.query("SELECT * FROM sinhvien", function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.get('/details', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "qlsinhvien"
    });

    con.connect(err => {
        if (err) throw err;
        var id = req.query.id;
        con.query(`SELECT * FROM sinhvien WHERE Id = ${id}`, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.post('/add', (req, res) => {
    var sv = {
        MSSV: req.body.mssv,
        Ho: req.body.ho,
        Ten: req.body.ten,
        DiemLT: req.body.diemLT,
        DiemTH: req.body.diemTH,
    };

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "qlsinhvien"
    });

    con.connect(err => {
        if (err) throw err;
        var sql = `INSERT INTO SinhVien (MSSV, Ho, Ten, DiemLT, DiemTH) VALUES ('${sv.MSSV}', '${sv.Ho}', '${sv.Ten}', '${sv.DiemLT}', '${sv.DiemTH}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.redirect("http://127.0.0.1:5500/index.html");
    });
});

app.post('/edit', (req, res) => {
    var sv = {
        Id: req.body.id,
        MSSV: req.body.mssv,
        Ho: req.body.ho,
        Ten: req.body.ten,
        DiemLT: req.body.diemLT,
        DiemTH: req.body.diemTH,
    };

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "qlsinhvien"
    });

    con.connect(err => {
        if (err) throw err;
        var sql = `UPDATE SinhVien SET MSSV = '${sv.MSSV}', Ho = '${sv.Ho}', Ten = '${sv.Ten}', DiemLT = ${sv.DiemLT}, DiemTH = ${sv.DiemTH} WHERE Id = ${sv.Id}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.redirect("http://127.0.0.1:5500/index.html");
    });
});

app.post('/delete', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "qlsinhvien"
    });

    con.connect(err => {
        if (err) throw err;
        var id = req.body.id;
        con.query(`DELETE FROM SinhVien WHERE Id = ${id}`, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.redirect("http://127.0.0.1:5500/index.html");
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});