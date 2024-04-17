
'use strict';

const sqlite = require('sqlite3');
const dayjs = require("dayjs");

function Film(id, title, fav = false, watchDate, rating){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.watchDate = watchDate && dayjs.watchDate;
    this.rating = rating;

    this.toString = () => {
        return `Id: ${this.id}, \n` + `Title: ${this.title}, \n` +
            `Favourite: ${this.fav} \n` + `watchDate: ${this.formatWatchDate('MMMM D, YYYY')}\n` +
            `Rating: ${this.formatRating()}\n`;
    }

    this.formatWatchDate = () => {
        return this.watchDate ? this.watchDate.format(format) : '<not defined>';
    }

    this.formatRating = () => {
        return this.rating ? this.rating : '<not defined>';
    }
}

function FilmLibrary(){
    const db = new sqlite.Database('films.db', (err) => {if (err) throw err; });

    this.closeDB = () => {
        try {
          db.close();
        }
        catch (error) {
          console.log(`Impossible to close the database! ${error}`);
        }
      }

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const query = "select * from films";
            db.all(query, [], (err, rows) => {
                if(err)
                    reject(err);
                else{
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            });
        });
    }

    this.getFav = () => {
        return new Promise((resolve, reject) => {
            const query = "select * from films where favorite = 1";
            db.all(query, [], (err, rows) => {
                if(err)
                    reject(err);
                else{
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            });
        });
    }

    this.watchedToday = () => {
        return new Promise((resolve, reject) => {
            const today = dayjs().format('YYYY-MM-DD');
            const query = "select * from films where watchdate = ?";
            db.all(query, [today], (err, rows) => {
                if(err)
                    reject(err);
                else{
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            });
        });
    }

    this.watchedInDate = (date) => {
        return new Promise((resolve, reject) => {
            const query = "select * from films where watchdate = ?";
            db.all(query, [date], (err, rows) => {
                if(err)
                    reject(err);
                else{
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            });
        });
    }

    this.betterFilm = (rank) => {
        return new Promise((resolve, reject) => {
            const query = "select * from films where rating >= ?";
            db.all(query, [rank], (err, rows) => {
                if(err)
                    reject(err);
                else{
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            });
        });
    }

    this.filmByTitle = (t) => {
        return new Promise((resolve, reject) => {
        const query = "select * from films where title like ?";
            db.all(query, ["%"+t+"%"], (err, rows) => {
                if(err)
                    reject(err);
                else{
                    const films = rows.map(record => new Film(record.id, record.title, record.favorite == 1, record.watchdate, record.rating));
                    resolve(films);
                }
            });
        });
    }
}


async function main(){
    const filmLibrary = new FilmLibrary();

    try {
        // get all the movies
        console.log('\n****** All the movies in the database: ******');
        const films = await filmLibrary.getAll();
        if(films.length === 0) {
          // If there are not movies in the database it is useless to execute other queries.
          console.log('No movies yet, try later.');
          filmLibrary.closeDB();
          return;
        }
        else
            films.forEach((film) => console.log(`${film}`));


        //get all the favourites
        console.log('\n****** All the favourites movies in the database: ******');
        const fav = await filmLibrary.getFav();
        if(fav.length === 0) {
          // If there are not movies in the database it is useless to execute other queries.
          console.log('No favourites movies yet, try later.');
          filmLibrary.closeDB();
          return;
        }
        else
            fav.forEach((film) => console.log(`${film}`));


        //get all the movies watched today
        console.log('\n****** All the movies watched today: ******');
        const watchedToday = await filmLibrary.watchedToday();
        if(fav.length === 0) {
          // If there are not movies in the database it is useless to execute other queries.
          console.log('No favourites movies yet, try later.');
          filmLibrary.closeDB();
          return;
        }
        else
            watchedToday.forEach((film) => console.log(`${film}`));

        
        //get all the movies watched in given date
        console.log('\n****** All the movies in given date: ******');
        const watchedInDate = await filmLibrary.watchedInDate('2023-03-10');
        if(fav.length === 0) {
          // If there are not movies in the database it is useless to execute other queries.
          console.log('No favourites movies yet, try later.');
          filmLibrary.closeDB();
          return;
        }
        else
            watchedInDate.forEach((film) => console.log(`${film}`));

        
        //get all the film with a greater or equal passed rating
        const rating = 4;
        console.log('\n****** All the movies with a rating higher than ' + rating + ': ******');
        const betterFilm = await filmLibrary.betterFilm(rating);
        if(fav.length === 0) {
          // If there are not movies in the database it is useless to execute other queries.
          console.log('No film with higher rank than ' + rating +'\n');
          filmLibrary.closeDB();
          return;
        }
        else
            betterFilm.forEach((film) => console.log(`${film}`));

        //search for title
        const string = "Pulp";
        console.log('\n****** All the movies containing the string ' + string + ': ******');
        const filmTitle = await filmLibrary.filmByTitle(string);
        if(fav.length === 0) {
          // If there are not movies in the database it is useless to execute other queries.
          console.log('No film with such name');
          filmLibrary.closeDB();
          return;
        }
        else
            filmTitle.forEach((film) => console.log(`${film}`));

            

    }
    catch (error) {
        console.error(`Impossible to retrieve movies! ${error}`);
        return;
    } finally {
        filmLibrary.closeDB();
    }
}

main();