
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
            `Favourite: ${this.fav} \n` + `watchDate: ${this.formatWatchDate('MMMM D, YYYY')}` +
            `Rating: ${this.formatRating()}`;
    }

    this.formatWatchDate = () => {
        return this.watchDate ? this.watchDate.format(format) : '<not defined>';
    }

    this.formatRating = () => {
        return this.rating ? this.rating : '<not defined>';
    }
}

