/*
* chapter 5 - Higher-Order Functions - Reading Examples
*/

// updated phi map

function gatherCorrelations(journal) {
  var phis = {};
  journal.forEach(function(entry) {
    entry.events.forEach(function(event) {
      if (!(event in phis))
        phis[event] = phi(tableFor(event, journal));
    });
  });
  return phis;
}

function greaterThan(n) {
  return function(m) { return m > n; };
}
var greaterThan10 = greaterThan(10;)

// Filtering an array

function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i])) {
      passed.push(array[i]);
    }
  }
  return passed;
}
console.log(filter(ancestry, function(person) {
  return person.born > 1900 && person.born < 1925;
}));
// built-in method
ancestry.filter(function(person) {
  return person.born > 1900 && person.born < 1925
});

// Transforming with map

function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}
var overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90;
});
console.log(map(overNinety, function(person) {
  return person.name;
}));
// built-in method
overNinety.map(function(person) {
  return person.name;
});

// Summarizing with reduce

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}
reduce([1, 2, 3, 4], function(a, b) {
  return a + b;
}, 0);
ancestry.reduce(function(accum, cur) {
  if (cur.born < accum.born) return cur;
  else return accum;
});


arrays.reduce(function(a, b) {
  return a.concat(b);
});


/*
* chapter 5 - Exercises
*/

// Flattening

var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce(function(a, b) {
  return a.concat(b);
}));


// Mother-child age difference

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
var byName = {};
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
var differences = ancestry.filter(function(person) {
  return (person.mother in byName);
}).map(function(person) {
  return person.born - byName[person.mother].born;
});










/*
* To do
*/
// redo Great-great-great-great section
// revisit "Passing along arguments" and Binding




/*
* Questions
*/

// in example below, how does JS know to map 0 to arg? Not sure I'm following exactly how this is working. Is noisy(Boolean) returning a function (with access to the original Bool functionality), that now has 0 as its arg?
function noisy(f) {
  return function(arg) {
    console.log("calling with", arg);
    var val = f(arg);
    console.log("called with", arg, "- got", val);
    return val;
  };
}
noisy(Boolean)(0);

// Pretty confused on the "Passing along arguments" and apply section - why two returns? What is getting passed to what? Can we maybe walk through it with the noisy example?
// Same goes for binding - I don't understand it
// Struggled with family tree exercise quite a bit
