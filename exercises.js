// chapter 3 - Functions

function min(n1, n2) {
    return (n1 < n2 ? n1 : n2);
}

function isEven(num) {
    num = Math.abs(num);
    if (num === 0) {
        return true;
    } else if (num === 1) {
        return false;
    } else {
        return isEven(num - 2);
    }
}

// function countBs(str) {
//     var countB = 0;
//     for (var i = 0; i < str.length; i++) {
//         if (str[i] === 'B')
//             countB++;
//     }
//     return countB;
// }

function countChar(str, char) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === char)
            count++;
    }
    return count;
}

function countBs(str) {
    return countChar(str, 'B');
}

// chapter 4 - Data Structures

var journal = [];

function addEntry(events, didITurnIntoASquirrel) {
    journal.push({
        events: events,
        squirrel: didITurnIntoASquirrel
    });
}
