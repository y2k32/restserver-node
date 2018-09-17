//===============================================
//              Puerto
//===============================================
process.env.PORT = process.env.PORT || 3000;
//===============================================
//              Entorno des/dev
//===============================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//===============================================
//              MongoDB
//===============================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://y2k32:1234Aasdy2k32@ds123822.mlab.com:23822/cafe_y2k32'
}
process.env.urlDBy = urlDB;