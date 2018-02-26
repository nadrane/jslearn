import React from 'react';

const AddReviewForm = () => (
  <form action="/movies/film/{{ movie.id }}" method="post">
      <div className="form-group">
          <label htmlFor="user" className="mt-2"><strong>Rating ★:</strong></label>
          <select className="form-control" id="stars" name="stars">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
          </select>
      </div>
      <div className="form-group">
          <label htmlFor="comment" className="mt-2"><strong>Review:</strong></label>
          <textarea className="form-control" id="comment" name="comment" rows="3"></textarea>
      </div>
      <div className="form-group text-right">
          <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
            Submit
          </button>
      </div>
  </form>
);

const AddDirectorForm = () => (
  <form action="/director" method="post">
      <div className="form-group">
          <label htmlFor="name" className="mt-2"><strong>Director Name:</strong></label>
          <input
            type="input"
            className="form-control"
            id="name"
            name="name"
            placeholder="e.g. Robert Altman"
            htmlautocomplete="off"
            />
      </div>
      <div className="form-group text-right">
          <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
            Submit
          </button>
      </div>
  </form>
);

const AddMovieForm = () => (
  <form action="/movies" method="post">
      <div className="form-group">
          <label htmlFor="title" className="mt-2"><strong>Film title:</strong></label>
          <input
            type="input"
            className="form-control"
            id="title"
            name="title"
            placeholder="e.g. Gone with the Wind"
            htmlautocomplete="off"
          />
      </div>
      <div className="form-group">
          <label htmlFor="year" className="mt-2"><strong>Year of release:</strong></label>
          <input
            type="input"
            className="form-control"
            id="year"
            name="year"
            placeholder="e.g. 1940"
            htmlautocomplete="off"
          />
      </div>
      <div className="form-group">
          <label htmlFor="director" className="mt-2"><strong>Director:</strong></label>
          <select className="form-control" id="director" name="directorId">
              <option selected disabled>Select director</option>
              <option value="{{ director.id }}">director.name</option>
          </select>
      </div>
      <div className="form-group text-right">
          <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
            Submit
          </button>
      </div>
  </form>
);

export { AddReviewForm, AddDirectorForm, AddMovieForm };
