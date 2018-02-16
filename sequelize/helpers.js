// helper to add rows for director/movie/user/review combos
const helpers = {
  roundedToFixed: (float, digits) => {
    const rounder = 10 ** digits;
    return (Math.round(float * rounder) / rounder).toFixed(digits);
  },
  timestamp: (obj) => {
    const currentTime = Date.now();
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const minsPerMonth = 40320;
    const minsPerWeek = 10080;
    const minsPerDay = 1440;
    const minsPerHour = 60;
    let ago;
    const mins = Math.round(((currentTime - obj.createdAt) / 1000) / 60);
    // over 4 weeks
    if (mins >= minsPerMonth) {
      const date = new Date(obj.datetime);
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
    /* eslint-disable */
    obj.timestamp = ago;
    /* eslint-enable */
    return obj;
    // Why doesn't the below work???
    // return Object.assign({}, obj, { ago })
  },
};

module.exports = helpers;
