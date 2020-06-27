// --- Port ---

process.env.PORT = process.env.PORT || 3000;

// --- Environment ---

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// --- Mongo DB ---

if(process.env.NODE_ENV === 'dev') {
    DBURL = 'mongodb://localhost:27017/coffee';
} else {
    DBURL = process.env.MONGO_URL
}

process.env.DBURL = DBURL