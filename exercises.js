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
