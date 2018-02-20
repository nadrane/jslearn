// helper to add rows for director/movie/user/review combos
const helpers = {
  roundedToFixed: (float, digits) => {
    const rounder = 10 ** digits;
    return (Math.round(float * rounder) / rounder).toFixed(digits);
  },
};

module.exports = helpers;
