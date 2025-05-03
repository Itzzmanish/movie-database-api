const { readMovies, writeMovies } = require('../utils/fileHelper');
exports.getAllMovies = (req, res, next) => {
 try {
   const movies = readMovies();
   res.json(movies);
 } catch (err) {
   next(err);
 }
};
exports.addMovie = (req, res, next) => {
 try {
   const movies = readMovies();
   const newMovie = { id: Date.now(), ...req.body };
   movies.push(newMovie);
   writeMovies(movies);
   res.status(201).json(newMovie);
 } catch (err) {
   next(err);
 }
};
exports.updateMovie = (req, res, next) => {
 try {
   let movies = readMovies();
   const index = movies.findIndex((m) => m.id == req.params.id);
   if (index === -1) return res.status(404).json({ message: 'Movie not found' });
   movies[index] = { id: movies[index].id, ...req.body };
   writeMovies(movies);
   res.json(movies[index]);
 } catch (err) {
   next(err);
 }
};
exports.partialUpdateMovie = (req, res, next) => {
 try {
   let movies = readMovies();
   const index = movies.findIndex((m) => m.id == req.params.id);
   if (index === -1) return res.status(404).json({ message: 'Movie not found' });
   movies[index] = { ...movies[index], ...req.body };
   writeMovies(movies);
   res.json(movies[index]);
 } catch (err) {
   next(err);
 }
};
exports.deleteMovie = (req, res, next) => {
 try {
   let movies = readMovies();
   movies = movies.filter((m) => m.id != req.params.id);
   writeMovies(movies);
   res.json({ message: 'Movie deleted' });
 } catch (err) {
   next(err);
 }
};