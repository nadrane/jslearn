/*
* Chapter 3 - Functions
*/
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

/*
* chapter 4 - Data Structures
*/

// reading examples
var journal = [];
var map = {};

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
                  (table[0] + table[1]) *
                  (table[1] + table[3]) *
                  (table[0] + table[2]));
}

function hasEvent(event, entry) {
    return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal) {
    var table = [0, 0, 0, 0];
    for (var i = 0; i < journal.length; i++) {
        var entry = journal[i], index = 0;
        if (hasEvent(event, entry))
            index += 1;
        if (entry.squirrel)
            index += 2;
        table[index]++;
    }
    return table;
}

function gatherCorrelations(journal) {
    var phis = {};
    for (var entry = 0; entry < journal.length; entry++) {
        var events = journal[entry].events;
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (!(event in phis))
                phis[event] = phi(tableFor(event, journal));
        }
    }
    return phis;
}

for (var event in correlations)
    if (correlations[event] > 0.1 || correlations[event] < - 0.1)
        console.log("The correlation of", event, "is", correlations[event]);

for (var i = 0; i < JOURNAL.length; i++) {
    var entry = JOURNAL[i];
    if (hasEvent("peanuts", entry) && !hasEvent("brushed teeth", entry))
        entry.events.push("peanut teeth");
}

// exercises
// The Sum of a Range
function range(start, stop, step) {
    var arr = [];
    if(!step)
        step = (start > stop ? -1 : 1)
    if (step > 0)
        for (var i = start; i <= stop; i += step)
            arr.push(i);
    else
        for (var j = start; j >= stop; j += step)
            arr.push(j);
    return arr;
}

function sum(arr) {
    var total = 0;
    for (var i = 0; i < arr.length; i++)
        total += arr[i];
    return total;
}

function altSum(arr) {
    var reducer = (accumulator, currentValue) => accumulator + currentValue;
    return arr.reduce(reducer);
}

// Reversing an Array
function reverseArray(arr) {
    var newArr = [];
    for (var i = arr.length - 1; i > -1; i--)
        newArr.push(arr[i]);
    return newArr;
}

function reverseArrayInPlace(arrayValue) {
    length = arrayValue.length
    for (var i = 0, n = Math.floor(length / 2); i < n; i++) {
        var temp = arrayValue[i];
        arrayValue[i] = arrayValue[length - 1 - i];
        arrayValue[length - 1 - i] = temp;
    }
}


// A List

function arrayToList(arr) {
    var list = null;
    for (var i = arr.length - 1; i > -1; i--)
        list = {value: arr[i], rest: list};
    return list;
}

function arrayToListRecurs(arr) {
    function buildList(index) {
        if (index == arr.length - 1)
            return {value: arr[index], rest: null};
        else
            return {value: arr[index], rest: buildList(index + 1)};
    }
    return buildList(0);
}

function listToArray(list) {
    var arr = [];
    for (var node = list; node; node = node.rest) {
        arr.push(node.value);
    }
    return arr;
}

function listToArray(list) {
    var arr = [];
    while (list) {
        arr.push(list.value);
        list = list.rest;
    }
    return arr;
}

function prepend(element, list) {
    return {value: element, rest: list};
}

function nth(list, n) {
    if (!list)
        return undefined;
    else if (n === 0)
        return list.value;
    else
        return nth(list.rest, n - 1);
}

// Deep Comparison

function deepEqual(o1, o2) {
    if (o1 === o2) {
    } else if (typeof(o1) === 'object' && typeof(o2) === 'object') {
        if (o1 === null || o2 === null) {
            return false;
        }
        for (var k in o1) {
            if (!deepEqual(o1[k], o2[k]))
                return false;
        }
        for (var k in o2) {
            if (!deepEqual(o2[k], o1[k]))
                return false;
        }
    }
    return true;
}
