/*
* Chapter 3 - Functions - Exercises
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
