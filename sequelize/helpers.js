// helper to add rows for director/movie/user/review combos
const helpers = {
  addData: (models, dataArr) => {
    dataArr.forEach((data) => {
      // insert director
      models.Director.create({ name: data.director })
        .then((dirRes) => {
          // add movie for this director
          const movieProm = models.Movie.create({
            title: data.title,
            year: data.year,
            directorDid: dirRes.dataValues.did,
          });
          // add user to review this movie
          const userProm = models.Reviewer.create({ username: data.username });
          return Promise.all([movieProm, userProm]);
        })
        // add review for this movie/user
        .then(res => models.Review.create({
          stars: data.stars,
          comment: data.comment,
          movieMid: res[0].dataValues.mid,
          reviewerUid: res[1].dataValues.uid,
        }))
        .catch(err => console.log(err));
    });
  },
  roundedToFixed: (float, digits) => {
    const rounder = 10 ** digits;
    return (Math.round(float * rounder) / rounder).toFixed(digits);
  },
};

module.exports = helpers;
