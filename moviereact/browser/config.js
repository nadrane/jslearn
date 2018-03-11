function roundedToFixed(float, digits) {
  const rounder = 10 ** digits;
  return (Math.round(float * rounder) / rounder).toFixed(digits);
}

const config = {
  fetchRoot: 'http://localhost:8080/api',

  //Maybe you could put this somewhere with just styles
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

  //Put this function inside the file where it is used
  avgStars: (arr) => {
    let avg = 0;
    if (arr) {
      avg = arr.reduce((accum, obj) => accum + obj.stars, 0) / arr.length;

      // This is weird and suggests to me you are compensating for a bug upstream.
      // Are you allowing null ratings? Can't we just filter these before we compute the average?
      // I can't understand why this code is needed
      if (typeof avg !== 'number' || Number.isNaN(avg)) {
        avg = 0;
      }
    }
    return roundedToFixed(avg, 1);
  },
};

module.exports = config;
