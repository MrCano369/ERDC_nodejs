const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', { user: req.session.user }));
router.get('/login', (req, res) => res.render('login', { user: req.session.user }));
router.get('/registro', (req, res) => res.render('registro', { user: req.session.user }));
router.get('*', (req, res) => res.render('nada', { user: req.session.user }));

module.exports = router;