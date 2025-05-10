const {Penulis} = require('../models')

const daftarPenulis = async (req, res) => {
  try {
    const penulis = await Penulis.findAll()
    res.status(201).json({
        "message": "Berhasil mendapatkan daftar penulis",
        "data": penulis
    })
  } catch (error) {
    res.status(500).json({
        "message": "Gagal mendapatkan daftar penulis",
        "error": error
    })
    console.log(error)
  }
}

const tambahPenulis = async (req, res) => {
  try {
    const {nama, alamat, umur, asal} = req.body
    const penulis = await Penulis.create({
        nama: nama,
        alamat: alamat,
        umur: umur,
        asal: asal
    })
    res.status(201).json({
        "message": "Berhasil menambahkan penulis",
        "data": penulis
    })
  } catch (error) {
    res.status(500).json({
        "message": "Gagal menambahkan penulis",
        "error": error
    })
    consoler.log(error)
  }
}
const ubahPenulis = async (req, res) => {
  try {
    const penulis = await Penulis.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json({
      "message": "Berhasil mengubah penulis",
      "data": penulis
    })
  }
  catch(error){
    res.status(500).json({
      "message": "Gagal mengubah penulis",
      "error": error
    })
    console.log(error)
  }
}

const hapusPenulis = async (req, res) => {
  try{
    const penulis = await Penulis.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(201).json({
      "message": "Berhasil menghapus penulis",
      "data": penulis
    })
  }
  catch(error){
    res.status(500).json({
      "message": "Gagal menghapus penulis",
      "error": error
    })
    console.log(error)
  }
}

const detailPenulis = async (req, res) => {
  try{
    const {id} = req.params
    const penulis = await Penulis.findByPk(id)
    res.status(201).json({
      "message": "Berhasil mendapatkan penulis",
      "data": penulis
    })
  }
  catch(error){
    res.status(500).json({
      "message": "Gagal mendapatkan penulis",
      "error": error
    })
    console.log(error)
  }
}

module.exports = {
  daftarPenulis,
  tambahPenulis,
  hapusPenulis,
  ubahPenulis,
  detailPenulis
}