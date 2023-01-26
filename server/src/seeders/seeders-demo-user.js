'use strict';
// email: DataTypes.STRING,
// password: DataTypes.STRING,
// firstName: DataTypes.STRING,
// lastName: DataTypes.STRING,
// address: DataTypes.STRING,
// phonenumber: DataTypes.STRING,
// gender: DataTypes.BOOLEAN,
// image: DataTypes.STRING,
// roleId: DataTypes.STRING,
// positionsId: DataTypes.STRING,
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password:'111',
      firstName: 'Tram Hiep',
      lastName: 'Thanh',
      address:'Ho Chi Minh',
      phonenumber:'0919711111',
      gender:1,
      image:'asdfa',
      roleId:'R1',
      positionId:'r1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};