'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penulis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Penulis.hasMany(models.Buku, {
        foreignKey: 'penulis_id'
      })
      // define association here
    }
  }
  Penulis.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    asal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penulis',
    tableName: 'penulis'
  });
  return Penulis;
};