const express = require('express');
const router = express.Router();
const penulisController = require('../controllers/penulis.controller');
const bukuController = require('../controllers/buku.controller');
const authController = require('../controllers/auth.controller');
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware');

router.get('/buku', bukuController.daftarBuku);
router.post('/buku',verifyToken, verifyRole('user'), bukuController.tambahBuku);
router.put('/buku/:id', bukuController.ubahBuku);
router.delete('/buku/:id', bukuController.hapusBuku);
router.get('/buku/:id', bukuController.detailBuku);


router.get('/penulis', penulisController.daftarPenulis);
router.post('/penulis', penulisController.tambahPenulis);
router.put('/penulis/:id', penulisController.ubahPenulis);
router.delete('/penulis/:id', penulisController.hapusPenulis);
router.get('/penulis/:id', penulisController.detailPenulis);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);



module.exports = router;