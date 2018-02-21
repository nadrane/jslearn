import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square">{props.value}</button>
  );
}

function OuterBox() {
  function renderSquare(i) {
    return (
      <Square
         value={i}
       />
    );
  }

  return (
    <div className="outerBox">
      {renderSquare(7)}
      {renderSquare(4)}
      {renderSquare('foo')}
    </div>
  );
}

ReactDOM.render(
  <OuterBox />,
  document.getElementById('root'),
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
