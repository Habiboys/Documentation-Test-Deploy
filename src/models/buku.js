'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Buku.belongsTo(models.Penulis, {
        foreignKey: 'penulis_id'
      })
      // define association here
    }
  }
  Buku.init({
    nama: DataTypes.STRING,
    penulis_id: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    tahun_terbit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Buku',
    tableName: 'buku'
  });
  return Buku;
};