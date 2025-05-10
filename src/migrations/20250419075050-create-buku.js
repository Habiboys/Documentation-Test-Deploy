'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buku', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      penulis_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'penulis',
          key: 'id'
        }
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      tahun_terbit: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buku');
  }
};