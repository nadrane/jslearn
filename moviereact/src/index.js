import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Panel() {
  return (
      <div className="panel">
          <h1>Thank you for watching movies.</h1>
          <button
            type="button"
            className="btn movie-btn add-btn mx-1"
            data-toggle="modal"
            data-target="#modal2">
            + Add Director
          </button>
          <button
            type="button"
            className="btn movie-btn add-btn mx-1"
            data-toggle="modal"
            data-target="#modal1">
            + Add Film</button>
          <h6 className="mint my-2">Sign in to add a movie, director, or review.</h6>
      </div>
  );
}

function Table() {
  return (
    <table className="table table-dark">
        <thead className="thead-light">
            <tr>
                <th scope="col">Movie</th>
                <th scope="col">Director</th>
                <th scope="col">Year</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row"><h6><a className="mint" href="/movies/film/movie.id">Movie.title</a></h6></th>
                <td><a className="white" href="/director/movie.director.id">Movie.director.name</a></td>
                <td>movie.year</td>
            </tr>
        </tbody>
    </table>
  );
}

ReactDOM.render(
  <Panel />,
  document.getElementById('panelRoot'),
);

ReactDOM.render(
  <Table />,
  document.getElementById('tableRoot'),
);

// class Board extends React.Component {
//   renderSquare(i) {
//     return (
//       <Square
//         value={i}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     history: [{
//       squares: Array(9).fill(null),
//     }],
//     stepNumber: 0,
//     xIsNext: true,
//   };
// }

// handleClick(i) {
//   const history = this.state.history.slice(0, this.state.stepNumber + 1);
//   const current = history[this.state.stepNumber];
//   const squares = current.squares.slice();
//   if (squares[i] || calculateWinner(squares)) {
//     return;
//   }
//   squares[i] = this.state.xIsNext ? 'X' : 'O';
//   this.setState({
//     history: history.concat([{
//       squares: squares,
//     }]),
//     stepNumber: history.length,
//     xIsNext: !this.state.xIsNext,
//   });
// }

// jumpTo(step) {
//   this.setState({
//     stepNumber: step,
//     xIsNext: (step % 2) === 0,
//   });
// }

// ========================================

// ReactDOM.render(
//   <Board />,
//   document.getElementById('root'),
// );
