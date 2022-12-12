'use strict';
var crypto = require('crypto');

module.exports = {

  async up(queryInterface, Sequelize) {
    generatePassword()
    return await queryInterface.bulkInsert('users', [{
      name: 'Takseem',
      profession: 'Administrator',
      phone: '03128526242',
      email: 'airas.mangotech@gmail.com',
      nic: '42201-7538887-9',
      gender: 'male',
      password: encrypted,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('users', null, {});

  }
};

var encrypted
var password = "password123";
var algorithm = "sha256";
var secret = "UDATaYRzbp25ra4GkNzgZ7NEJa6H61SDx";

function generatePassword() {
  encrypted = crypto.createHash(algorithm, secret).update(password).digest('hex');
}
