
'use strict';
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
    this.list = [];

    this.addNewFilm = (film) => {
        if(!this.list.some(f => f.id === film.id))
            this.list.push(film);
        else
            throw new Error ('Duplicated id!');
    };

    this.print = () => {
        console.log("---------- LIST OF FILMS ----------");
        this.list.forEach((item) => console.log(item.toString()));
    };
}


function main(){
    const f1 = new Film(1, "Pulp Fiction", true, "2023-03-10", 5);
    const f2 = new Film(2, "21 Grams", true, "2023-03-17", 4);
    const f3 = new Film(3, "Star Wars", false);
    const f4 = new Film(4, "Matrix");
    const f5 = new Film(5, "Shrek", false, "2023-03-21", 3);

    const Library = new FilmLibrary();
    Library.addNewFilm(f1);
    Library.addNewFilm(f2);
    Library.addNewFilm(f3);
    Library.addNewFilm(f4);
    Library.addNewFilm(f5);
    
    Library.print();

}

main();