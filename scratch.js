function once(f) {
    var state = 0;
    return function() {
        state++;
        if (state === 0) {
            return f.apply(null, [].prototype.slice.call(arguments);
        }
    };
}

once(function() {
    console.log('nick')
})

const decoratedFunc1 = once()
const decoratedFunc2 = once()
decoratedFunc1(arg1,... arg10) // nick
decoratedFunc2()

once(f)()
once(f)()

console.log('nick')

//Homework

// look up lodash, go through and implement lodash function (map, function, reuce, filter, etc)
////// specific ones = look at sort, ** look for things that have a predicate
// always use const, look at links re: scope of let/const/var

// when get bored, implement all recursively

// Work through chapter 11 of eloquentJS

// after 11, nick has an exercise to implement a regex engine

// write a json parser (a recursive descent parser)

// then eloquent through ch 15

// solve game of life in 2 ways - 1 is storing state in dom itself (data attirbutes), then storing state in javascript

