/*
* Chapter 3 - Functions - Exercises
*/

function min(n1, n2) {
  return (n1 < n2 ? n1 : n2);
}
min();

function isEven(num) {
  const absNum = Math.abs(num);
  if (absNum === 0) {
    return true;
  } else if (absNum === 1) {
    return false;
  }
  return isEven(absNum - 2);
}
isEven();

function countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === char) { count += 1; }
  }
  return count;
}
function countBs(str) {
  return countChar(str, 'B');
}
countBs();
