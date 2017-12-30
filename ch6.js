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
TextCell.prototype.minWidth = function minWidth() {
  return this.text.reduce((accum, line) => Math.max(accum, line.length), 0);
};
TextCell.prototype.minHeight = function minHeight() {
  return this.text.length;
};
TextCell.prototype.draw = function draw(width, height) {
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
RTextCell.prototype.draw = function draw(width, height) {
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
UnderlinedCell.prototype.minWidth = function minWidth() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function minHeight() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function draw(width, height) {
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


/*
* Chapter 6 - Questions
*/
