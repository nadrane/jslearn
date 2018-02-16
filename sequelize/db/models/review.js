const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const minsPerMonth = 40320;
const minsPerWeek = 10080;
const minsPerDay = 1440;
const minsPerHour = 60;

const Sequelize = require('sequelize');
const connection = require('../connect');

const Review = connection.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  getterMethods: {
    ago() {
      let ago;
      const currentTime = Date.now();
      const mins = Math.round(((currentTime - this.getDataValue('createdAt')) / 1000) / 60);
      // over 4 weeks
      if (mins >= minsPerMonth) {
        const date = new Date(this.getDataValue('createdAt'));
        ago = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      } else if (mins > minsPerWeek) {
        ago = `${Math.round(mins / minsPerWeek)}w ago`;
      } else if (mins > minsPerDay) {
        ago = `${Math.round(mins / minsPerDay)}d ago`;
      } else if (mins > minsPerHour) {
        ago = `${Math.round(mins / minsPerHour)}h ago`;
      } else if (mins > 0) {
        ago = `${Math.floor(mins)}m ago`;
      } else {
        ago = 'just now';
      }
      return ago;
    },
  },
});

module.exports = Review;
