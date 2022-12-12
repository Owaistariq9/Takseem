'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ride_statuses', [
    {
      status: 'Created',
      color: '#4BB543',
    },
    {
      status: 'Passenger Requested',
      color: '#008080',
    },
    {
      status: 'Request Accepted',
      color: '#4BB543',
    },
    {
      status: 'Ride Started',
      color: '#4BB543',
    },
    {
      status: 'Ride Cancelled',
      color: '#C70039',
    },
    {
      status: 'Passenger Picked Up',
      color: '#008080',
    },
    {
      status: 'Ride Completed',
      color: '#4BB543',
    },
    {
      status: 'Arrived at Location',
      color: '#FFC300',
    },
    {
      status: 'Passenger not Coming',
      color: '#C70039',
    },
    {
      status: 'Driver not Coming',
      color: '#C70039',
    },
  
   
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ride_statuses', null, {});

  }
};
