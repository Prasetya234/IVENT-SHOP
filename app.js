const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const app = express();
const port = 1250;

// view engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'prasetya',
    password: '1234',
    database: 'onlineshop'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

app.get('/', (req, res) => {
    koneksi.query('SELECT*FROM pelanggan', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'onlineshop',
            data: hasil
        });
    });
});

app.post('/pelanggan', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    var ALAMAT = req.body.inputALAMAT;
    var TELEPON = req.body.inputTELEPON;
    koneksi.query('INSERT INTO pelanggan(NAMA, ALAMAT,TELEPON)values(?,?,?)',
    [NAMA, ALAMAT, TELEPON],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});
app.get('/hapus-NAMA/:NAMA', (req, res) => {
        var NAMA = req.params.NAMA; 
        koneksi.query('DELETE FROM pelanggan WHERE NAMA=?', 
        [NAMA], (err, hasil) => {
            if(err) throw err;
            res.redirect('/');
        }
    )
});

//Penjualan

app.get('/penjualan', (req, res) => {
    koneksi.query('SELECT*FROM penjualan', (err, hasil) => {
        if(err) throw err;
        res.render('penjualan.hbs',{
            judulhalaman: 'onlineshop',
            data: hasil
        });
    });
});

app.post('/penjualan', (req, res) =>{
    var NAMA_BARANG = req.body.inputNAMA_BARANG;
    var JUMLAH = req.body.inputJUMLAH;
    var HARGA = req.body.inputHARGA;
    koneksi.query('INSERT INTO penjualan(NAMA_BARANG, JUMLAH, HARGA)values(?,?,?)',
    [NAMA_BARANG, JUMLAH, HARGA],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/penjualan');
    }
    )
});

app.get('/hapus-NAMA_BARANG/:NAMA_BARANG', (req, res) => {
    var NAMA_BARANG = req.params.NAMA_BARANG;
    koneksi.query("DELETE FROM penjualan WHERE NAMA_BARANG=?",
         [NAMA_BARANG], (err, hasil) => {
             if(err) throw err;
             res.redirect('/penjualan');
         }
    )
});

//PENDAPATAN
app.get('/pendapatan', (req, res) => {
    koneksi.query('SELECT*FROM pendapatan', (err, hasil) => {
        if(err) throw err;
        res.render('pendapatan.hbs',{
            judulhalaman: 'online shop',
            data: hasil
        });
    });
});

app.post('/pendapatan', (req, res) =>{
    var KETERANGAN = req.body.inputKETERANGAN;
    var JUMLAH = req.body.inputJUMLAH;
    koneksi.query('INSERT INTO pendapatan(KETERANGAN, JUMLAH)values(?,?)',
    [KETERANGAN, JUMLAH],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pendapatan');
    }
    )
});

app.get('/hapus-id_transaksi/:id_transaksi', (req, res) => {
    var id_transaksi = req.params.id_transaksi;
    koneksi.query("DELETE FROM pendapatan WHERE id_transaksi=?",
         [id_transaksi], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pendapatan');
         }
    )
});
app.listen(port, () => {
    console.log(`app INVENT-SHOP berjalan pada port ${port}`);
});