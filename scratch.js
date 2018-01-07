/* eslint no-console: "off" */
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

// function once(f) {
//   let state = 0;
//   return (...theArgs) => {
//     state += 1;
//     if (state === 1) {
//       return f(...theArgs);
//     }
//     return `this was the ${state} call!`;
//   };
// }

// function argBark(...theArgs) {
//   for (let i = 0; i < theArgs.length; i += 1) {
//     console.log(theArgs[i]);
//   }
// }

// const dec1 = once(argBark);
// dec1('hi');

// const ancestry = {};

// // built-in method
// ancestry.filter(person => person.born > 1900 && person.born < 1925);


// ancestry.filter(person => person.father === 'Carel Haverbeke');

// const byName = {};

// const differences = ancestry
//   .filter(person => person.mother in byName)
//   .map(person => person.born - byName[person.mother].born);

// console.log(differences);


// function foo() {
//   console.log('hey');
//   if (!foo.count) {
//     foo.count = 0;
//   }
//   foo.count += 1; // `foo` refers to itself
// }

// function foo() {
//  console.log( this.a );
// }

// function doFoo(fn) {
//  // `fn` is just another reference to `foo`

//  fn(); // <-- call-site!
// }

// var obj = {
//  a: 2,
//  foo: function() {
//     console.log( this.a );
//   },
// };

// var a = "oops, global"; // `a` also property on global object

// doFoo( obj.foo ); // "oops, global"

// var one = {
//   a: 'hello',
// };

// var two = {
//   a: 'hi'
// };

// Object.defineProperty(two, 'b', {
//   value: 'second',
//   writable: false,
//   configurable: true,
//   enumerable: true,
// });

// function ryan() {
//   // ...
// }

// var funcs = [];

// for (var i = 0; i < 6; i++) {
//   console.log('printing: ' + i);
// 	funcs.push( function(){
// 		console.log( i );
// 	} );
// }

// funcs[3]();		// 3
