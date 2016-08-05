import phonetic from "phonetic";
import Autolinker from "autolinker";


export const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const generateRandomUsername = function () {
    let username = phonetic.generate({syllables: 3, phoneticSimplicity: 1});
    if (Math.random() >= 0.5) {
        username += getRandomInt(30, 99);
    }
    return username.toLowerCase();
};

export const nl2br = function (data) {
    if (!data) return data;
    return data.replace(/\r?\n/g, '<br/>');
};

export const autolink = function (data) {
    return Autolinker.link(data, {truncate: {length: 50, location: 'middle', newWindow: true}});
};