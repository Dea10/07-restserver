// --- Port ---

process.env.PORT = process.env.PORT || 3000;

// --- Environment ---

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// --- Mongo DB ---

if(process.env.NODE_ENV === 'dev') {
    DBURL = 'mongodb://localhost:27017/coffee';
} else {
    DBURL = 'mongodb+srv://dea_test:7mB9SIVvpHHsVpzx@cluster0-t4eii.mongodb.net/coffee'
}

process.env.DBURL = DBURL