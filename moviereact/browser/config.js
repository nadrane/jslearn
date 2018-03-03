function roundedToFixed(float, digits) {
  const rounder = 10 ** digits;
  return (Math.round(float * rounder) / rounder).toFixed(digits);
}

const config = {
  fetchRoot: 'http://localhost:8080/api',
  modalStyle: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, .5)',
    },
    content: {
      top: '10%',
      left: '25%',
      right: '25%',
      bottom: '25%',
      backgroundColor: '#E9F5FD',
      overflow: 'auto',
    },
  },
  avgStars: (arr) => {
    let avg = 0;
    if (arr) {
      avg = arr.reduce((accum, obj) => accum + obj.stars, 0) / arr.length;
      if (typeof avg !== 'number' || Number.isNaN(avg)) {
        avg = 0;
      }
    }
    return roundedToFixed(avg, 1);
  },
};

module.exports = config;
