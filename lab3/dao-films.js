
const dayjs = require("dayjs");
const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('films.db', (err) => {
  if (err) throw err;
});


exports.listFilms = ()=> {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films';
        db.all(query, (err, rows) => {
            if(err)
                reject(err);
            else{
                const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                resolve(rows);
            }
        });
    });
}