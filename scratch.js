function once(f) {
  let state = 0;
  const x = function x(...theArgs) {
    state += 1;
    if (state === 1) {
      return f.bind(null, theArgs);
    }
    return undefined;
  };
  return x;
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
