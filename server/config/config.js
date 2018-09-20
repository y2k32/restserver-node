//===============================================
//              Puerto
//===============================================
process.env.PORT = process.env.PORT || 3000;
//===============================================
//              Caducidad token
//===============================================

// 60 s, 60min, 24h, 30días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//===============================================
//              Seed
//===============================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
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
    urlDB = process.env.MONGO_URL;
}
process.env.urlDBy = urlDB;
//===============================================
//              Google Clint_ID
//===============================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '875985448423-sc4bhnbh8psgsok2t7pj8fa821nav42r.apps.googleusercontent.com';