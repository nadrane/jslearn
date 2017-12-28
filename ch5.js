/*
* Chapter 5 - Higher-Order Functions - Reading Examples
*/
/* eslint-disable */

// Updated phi map

function gatherCorrelations(journal) {
  const phis = {};
  journal.forEach(function (entry) {
    entry.events.forEach(function(event) {
      if (!(event in phis)) phis[event] = phi(tableFor(event, journal));
    });
  });
  return phis;
}
gatherCorrelations();

function greaterThan(n) {
  return function(m) {
    return m > n;
  };
}
var greaterThan10 = greaterThan(10);

// Filtering an array

function filter(array, test) {
  const passed = [];
  for (let i = 0; i < array.length; i += 1) {
    if (test(array[i])) {
      passed.push(array[i]);
    }
  }
  return passed;
}
console.log(filter(ancestry, person =>
  person.born > 1900 && person.born < 1925));
// built-in method
ancestry.filter(person => person.born > 1900 && person.born < 1925);

// Transforming with map

function map(array, transform) {
  const mapped = [];
  for (let i = 0; i < array.length; i += 1) mapped.push(transform(array[i]));
  return mapped;
}
const overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90;
});
console.log(
  map(overNinety, function(person) {
    return person.name;
  })
);
// built-in method
overNinety.map(person => person.name);

// Summarizing with reduce

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++) current = combine(current, array[i]);
  return current;
}
reduce(
  [1, 2, 3, 4],
  function(a, b) {
    return a + b;
  },
  0
);
ancestry.reduce((accum, cur) => {
  if (cur.born < accum.born) {
    return cur;
  }
  return accum;
});

arrays.reduce((a, b) => a.concat(b));

/*
* Chapter 5 - Exercises
*/

// Flattening

console.log(arrays.reduce((accum, cur) => {
  return accum.concat(cur)
}));

// Mother-child age difference
// helpers
function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}
const byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// first attempt
function hasKnownMother(person) {
  return person.mother in byName;
}

function ageDiff(person) {
  return person.born - byName[person.mother].born;
}

console.log(average(ancestry.filter(hasKnownMother).map(ageDiff)));

// updated syntax
var differences = ancestry
  .filter(person => person.mother in byName)
  .map(person => person.born - byName[person.mother].born);

// Historical life expectancy
// first attempt
function groupBy(accum, person) {
  var century = Math.ceil(person.died / 100);
  if (!(century in accum)) {
    accum[century] = [];
  }
  accum[century].push(person.died - person.born);
  return accum;
}

var ageMap = ancestry.reduce(groupBy, {});

for (var k in ageMap) {
  console.log(k + ": " + average(ageMap[k]));
}
// second attempt with higher order option
function groupBy(array, groupOf) {
  const groups = {};
  array.forEach((element) => {
    const groupName = groupOf(element);
    if (groupName in groups) {
      groups[groupName].push(element);
    } else {
      groups[groupName] = [element];
    }
  });
  return groups;
}
groupBy();

const byCentury = groupBy(ancestry, person => Math.ceil(person.died / 100));


// Every and then some

function every(array, test) {
  for (var i = 0; i < array.length; i++) {
    if (!test(array[i])) {
      return false;
    }
  }
  return true;
}

function some(array, test) {
  for (var i = 0; i < array.length; i++) {
    if (test(array[i])) {
      return true;
    }
  }
  return false;
}

every([NaN, NaN, NaN], elem => Number.isNaN(elem));
some([1, 2, NaN], elem => Number.isNaN(elem));
