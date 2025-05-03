const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res, next) => {
 const { username, email, password } = req.body;
 try {
   const hashed = await bcrypt.hash(password, 10);
   const result = await pool.query(
     'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
     [username, email, hashed]
   );
   res.status(201).json({ user: result.rows[0] });
 } catch (err) {
   next(err);
 }
};
exports.login = async (req, res, next) => {
 const { email, password } = req.body;
 try {
   const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
   const user = result.rows[0];
   if (!user) return res.status(400).json({ message: 'User not found' });
   const match = await bcrypt.compare(password, user.password);
   if (!match) return res.status(400).json({ message: 'Invalid password' });
   const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
     expiresIn: '1h'
   });
   res.json({ token });
 } catch (err) {
   next(err);
 }
};