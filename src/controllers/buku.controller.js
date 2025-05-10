const {Buku, Penulis} = require('../models')
const buku = require('../models/buku')



const daftarBuku = async (req, res) => {
  try {
    const buku = await Buku.findAll(
        {
            include: Penulis
        }
    )
    res.status(200).json({
      message: 'daftar buku',
      data: buku
    })
  }catch (error) {
    res.status(500).json({
      message: 'terjadi kesalahan',
      error: error.message
    })
  }
}

const tambahBuku = async (req, res) => {
  try {
    const {nama, penulis_id, deskripsi, tahun_terbit} = req.body
    const buku = await Buku.create({
      nama,
      penulis_id,
      deskripsi,
      tahun_terbit
    })
    res.status(201).json({
      message: 'buku berhasil ditambahkan',
      data: buku
    })
  }catch (error) {
    res.status(500).json({
      message: 'terjadi kesalahan',
      error: error.message
    })
  }
}
const hapusBuku = async (req, res) => {
  try {
    const {id} = req.params
    const buku = await Buku.findByPk(id)
    if (!buku) {
      return res.status(404).json({
        message: 'buku tidak ditemukan'
      })
    }
    await buku.destroy()
    res.status(200).json({
      message: 'buku berhasil dihapus'
    })
  }catch (error) {
    res.status(500).json({
      message: 'terjadi kesalahan',
      error: error.message
    })
  }
}
const ubahBuku = async (req, res) => {
  try {
    const {id} = req.params
    const {nama, penulis_id, deskripsi, tahun_terbit} = req.body
    const buku = await Buku.findByPk(id)
    if (!buku) {
      return res.status(404).json({
        message: 'buku tidak ditemukan'
      })
    }
    await buku.update({
      nama,
      penulis_id,
      deskripsi,
      tahun_terbit
    })
    res.status(200).json({
      message: 'buku berhasil diubah',
      data: buku
    })
  } catch (error) {
    res.status(500).json({
      message: 'terjadi kesalahan',
      error: error.message
    })
  }
}

const detailBuku = async (req, res) => {
  try {
    const {id} = req.params
    const buku = await Buku.findByPk(id)
    if (!buku) {
      return res.status(404).json({
        message: 'buku tidak ditemukan'
      })
    }
    res.status(200).json({
      message: 'buku berhasil ditemukan',
      data: buku
    })
  }
  catch (error) {
    res.status(500).json({
      message: 'terjadi kesalahan',
      error: error.message
    })
  }
}

module.exports = {
  daftarBuku,
  tambahBuku,
  hapusBuku,
  ubahBuku,
  detailBuku
}