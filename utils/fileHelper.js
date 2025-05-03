const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/movies.json');
const readMovies = () => {
 const data = fs.readFileSync(filePath);
 return JSON.parse(data);
};
const writeMovies = (movies) => {
 fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
};
module.exports = { readMovies, writeMovies };