/* eslint no-console: "off" */

/*
* Chapter 6 - The Secret Life of Objects - Reading
*/

// sample dataset

const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
  { name: 'Everest', height: 8848, country: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, country: 'Japan' },
  { name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
  { name: 'Vaalserberg', height: 323, country: 'Netherlands' },
  { name: 'Denali', height: 6168, country: 'United States' },
  { name: 'Popocatepetl', height: 5465, country: 'Mexico' },
];

// TextCell construction, prototype, and helpers

function repeat(string, times) {
  let result = '';
  for (let i = 0; i < times; i += 1) {
    result += string;
  }
  return result;
}
function TextCell(text) {
  this.text = text.split('\n');
}
TextCell.prototype.minWidth = function textCellMinWidth() {
  return this.text.reduce((accum, line) => Math.max(accum, line.length), 0);
};
TextCell.prototype.minHeight = function textCellMinHeight() {
  return this.text.length;
};
TextCell.prototype.draw = function textCellDraw(width, height) {
  const result = [];
  for (let i = 0; i < height; i += 1) {
    const line = this.text[i] || '';
    result.push(line + repeat(' ', width - line.length));
  }
  return result;
};
function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function rTextCellDraw(width, height) {
  const result = [];
  for (let i = 0; i < height; i += 1) {
    const line = this.text[i] || '';
    result.push(repeat(' ', width - line.length) + line);
  }
  return result;
};

// UnderlinedCell construction and prototype

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function underlinedCellMinWidth() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function underlinedCellMinHeight() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function underlinedCellDraw(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat('-', width)]);
};

// load dataset into memory

function dataTable(data) {
  const keys = Object.keys(data[0]);
  const headers = keys.map(key => (
    new UnderlinedCell(new TextCell(key))
  ));
  const body = data.map(row => (
    keys.map((key) => {
      const value = row[key];
      if (typeof value === 'number') {
        return new RTextCell(String(value));
      }
      return new TextCell(String(value));
    })
  ));
  return [headers].concat(body);
}

// core table building program

function rowHeights(rows) {
  return rows.map(row => (
    row.reduce((max, cell) => (
      Math.max(max, cell.minHeight())
    ), 0)
  ));
}
function colWidths(rows) {
  return rows[0].map((_, i) => (
    rows.reduce((max, row) => (
      Math.max(max, row[i].minWidth())
    ), 0)
  ));
}
function drawTable(rows) {
  const heights = rowHeights(rows);
  const widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(block => block[lineNo]).join(' ');
  }
  function drawRow(row, rowNum) {
    const blocks = row.map((cell, colNum) => (
      cell.draw(widths[colNum], heights[rowNum])
    ));
    return blocks[0].map((_, lineNo) => drawLine(blocks, lineNo)).join('\n');
  }
  return rows.map(drawRow).join('\n');
}
console.log(drawTable(dataTable(MOUNTAINS)));


/*
* Chapter 6 - Exercises
*/

// 1. A Vector Type

function Vector(x, y) {
  this.x = Number(x);
  this.y = Number(y);
}

Vector.prototype.plus = function plus(otherVec) {
  const newX = this.x + otherVec.x;
  const newY = this.y + otherVec.y;
  return new Vector(newX, newY);
};

Vector.prototype.minus = function minus(otherVec) {
  const newX = this.x - otherVec.x;
  const newY = this.y - otherVec.y;
  return new Vector(newX, newY);
};

Object.defineProperty(Vector.prototype, 'length', {
  get: function length() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
  },
});

// 2. Another Cell

function StretchCell(cell, width, height) {
  this.inner = cell;
  this.stretchWidth = width;
  this.stretchHeight = height;
}
StretchCell.prototype.minWidth = function stretchCellMinWdith() {
  return Math.max(this.stretchWidth, this.inner.minWidth());
};
StretchCell.prototype.minHeight = function stretchCellMinHeight() {
  return Math.max(this.stretchHeight, this.inner.minHeight());
};
StretchCell.prototype.draw = function stretchCellDraw(width, height) {
  return this.inner.draw(width, height);
};
const sc = new StretchCell(new TextCell('abc'), 1, 2);
sc.draw(3, 2);

// 3. Sequence Interface

function ArraySeq(arr) {
  this.holder = [].concat(arr);
  this.seqLength = this.holder.length;
}
ArraySeq.prototype.iterate = function arrayIterate(num, func) {
  const iterate = Math.min(num, this.seqLength);
  for (let i = 0; i < iterate; i += 1) {
    func(this.holder[i]);
  }
};
function RangeSeq(from, to) {
  const range = Array.from(new Array((to - from) + 1), (x, i) => i + from);
  this.inner = new ArraySeq(range);
}
RangeSeq.prototype.iterate = function rangeIterate(num, func) {
  return this.inner.iterate(num, func);
};

function logFive(seqObj) {
  seqObj.iterate(5, console.log);
}
logFive(new RangeSeq(100, 1000));


/*
* Chapter 6 - Questions
*/
