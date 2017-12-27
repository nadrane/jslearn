// function once(f) {
//   let state = 0;
//   const x = function x(...theArgs) {
//     state += 1;
//     if (state === 1) {
//       return f.bind(null, theArgs);
//     }
//     return undefined;
//   };
//   return x;
// }

/* eslint no-console: "off" */

function once(f) {
  let state = 0;
  return (...theArgs) => {
    state += 1;
    if (state === 1) {
      return f(...theArgs);
    }
    return `this was the ${state} call!`;
  };
}

function argBark(...theArgs) {
  for (let i = 0; i < theArgs.length; i += 1) {
    console.log(theArgs[i]);
  }
}

const dec1 = once(argBark);
dec1('hi');

const ancestry = {};

// built-in method
ancestry.filter(person => person.born > 1900 && person.born < 1925);


ancestry.filter(person => person.father === 'Carel Haverbeke');

const byName = {};

const differences = ancestry
  .filter(person => person.mother in byName)
  .map(person => person.born - byName[person.mother].born);

console.log(differences);
