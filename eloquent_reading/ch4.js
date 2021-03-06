/*
* chapter 4 - Data Structures - Reading Examples
*/

/* eslint-disable */

const JOURNAL = [];
const map = {};

function phi(table) {
  const num = (table[3] * table[0]) - (table[2] * table[1]);
  const denom = Math.sqrt((table[2] + table[3]) *
                          (table[0] + table[1]) *
                          (table[1] + table[3]) *
                          (table[0] + table[2]));
  return num / denom;
}

function hasEvent(event, entry) {
  return entry.events.indexOf(event) !== -1;
}

function tableFor(event, aJournal) {
  const table = [0, 0, 0, 0];
  for (let i = 0; i < aJournal.length; i += 1) {
    const entry = aJournal[i];
    let index = 0;
    if (hasEvent(event, entry)) { index += 1; }
    if (entry.squirrel) { index += 2; }
    table[index] += 1;
  }
  return table;
}

function gatherCorrelations(aJournal) {
  const phis = {};
  for (let entry = 0; entry < aJournal.length; entry += 1) {
    const events = aJournal[entry].events;
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      if (!(event in phis)) { phis[event] = phi(tableFor(event, aJournal)); }
    }
  }
  return phis;
}
gatherCorrelations();


for (const event in correlations) {
  if (correlations[event] > 0.1 || correlations[event] < -0.1) { console.log('The correlation of', event, 'is', correlations[event]); }
}

for (let i = 0; i < JOURNAL.length; i += 1) {
  const entry = JOURNAL[i];
  if (hasEvent('peanuts', entry) && !hasEvent('brushed teeth', entry)) { entry.events.push('peanut teeth'); }
}

/*
* chapter 4 - Data Structures - Exercises
*/

// The Sum of a Range
function range(start, stop, step) {
  const arr = [];
  if (!step) { step = (start > stop ? -1 : 1); }
  if (step > 0) {
    for (let i = start; i <= stop; i += step) { arr.push(i); }
  } else {
    for (let j = start; j >= stop; j += step) { arr.push(j); }
  }
  return arr;
}
range();

function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i += 1) { total += arr[i]; }
  return total;
}
sum();

function altSum(arr) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return arr.reduce(reducer);
}
altSum();

// Reversing an Array
function reverseArray(arr) {
  const newArr = [];
  for (let i = arr.length - 1; i > -1; i -= 1) { newArr.push(arr[i]); }
  return newArr;
}
reverseArray();

function reverseArrayInPlace(arrayValue) {
  length = arrayValue.length;
  for (let i = 0, n = Math.floor(length / 2); i < n; i += 1) {
    const temp = arrayValue[i];
    arrayValue[i] = arrayValue[length - 1 - i];
    arrayValue[length - 1 - i] = temp;
  }
}
reverseArrayInPlace();

// A List
function arrayToList(arr) {
  let list = null;
  for (let i = arr.length - 1; i > -1; i -= 1) { list = { value: arr[i], rest: list }; }
  return list;
}
arrayToList();

// function arrayToListRecurs(arr) {
//   function buildList(index) {
//     if (index == arr.length - 1)
//       return {value: arr[index], rest: null};
//     else
//       return {value: arr[index], rest: buildList(index + 1)};
//   }
//   return buildList(0);
// }

function listToArray(list) {
  const arr = [];
  for (let node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
}
listToArray();

// function listToArray2(list) {
//   var arr = [];
//   while (list) {
//     arr.push(list.value);
//     list = list.rest;
//   }
//   return arr;
// }

function prepend(element, list) {
  return { value: element, rest: list };
}
prepend();

function nth(list, n) {
  if (!list) { return undefined; } else if (n === 0) { return list.value; }
  return nth(list.rest, n - 1);
}
nth();

// Deep Comparison
function deepEqual(o1, o2) {
  if (o1 === o2 || o1 === null || o2 === null) {
    return o1 === o2;
  }
  if (typeof (o1) === 'object' && typeof (o2) === 'object') {
    for (var k in o1) {
      if (!deepEqual(o1[k], o2[k])) {
        return false;
      }
    }
    for (var k in o2) {
      if (!deepEqual(o2[k], o1[k])) {
        return false;
      }
    }
    return true;
  }
  return o1 === o2;
}
deepEqual();

function deepEqual(o1, o2) {
  if (o1 === o2 || o1 === null || o2 === null) {
    return o1 === o2;
  }
  if (typeof (o1) === 'object' && typeof (o2) === 'object') {
    let props1 = 0,
      props2 = 0;
    for (var k in o1) {
      props1 += 1;
    }
    for (var k in o2) {
      props2 += 1;
      if (!(k in o1) || !deepEqual2(o2[k], o1[k])) {
        return false;
      }
    }
    return props1 === props2;
  }
  return o1 === o2;
}
deepEqual();
