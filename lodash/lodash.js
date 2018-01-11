/* eslint no-console: 'off' */

/*
* Helpers
*/

const Helper = {
  // custom floor helper function to make sure negative #s (like -0.5) round toward zero
  myFloor(num) {
    return Math.abs(num - (num % 1));
  },

  // combine counts of two objects
  combineCounts(objA, objB) {
    const fin = {};
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    for (let i = 0; i < keysA.length; i += 1) {
      const key = keysA[i];
      if (!(key in fin)) {
        fin[key] = objA[key];
      } else {
        fin[key] += objA[key];
      }
    }
    for (let i = 0; i < keysB.length; i += 1) {
      const key = keysB[i];
      if (!(key in fin)) {
        fin[key] = objB[key];
      } else {
        fin[key] += objB[key];
      }
    }
    return fin;
  },

  // merge arrays between two objects
  combineArrays(objA, objB) {
    const fin = {};
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    for (let i = 0; i < keysA.length; i += 1) {
      const key = keysA[i];
      if (!(key in fin)) {
        fin[key] = objA[key].slice();
      } else {
        fin[key] = fin[key].concat(objA[key]);
      }
    }
    for (let i = 0; i < keysB.length; i += 1) {
      const key = keysB[i];
      if (!(key in fin)) {
        fin[key] = objB[key].slice();
      } else {
        fin[key] = fin[key].concat(objB[key]);
      }
    }
    return fin;
  },
};


/*
*  lodash functions implemented iteratively
*/

const _ = {
  dropWhile(arr, func) {
    const processed = [];
    let keep = false;
    for (let i = 0; i < arr.length; i += 1) {
      if (!keep && !func(arr[i])) {
        keep = true;
      }
      if (keep === true) {
        processed.push(arr[i]);
      }
    }
    return processed;
  },

  sortedIndexBy(arr, val, func) {
    let min = arr.length;
    for (let i = 0; i < arr.length; i += 1) {
      if (func(val) <= func(arr[i])) {
        min = i;
        break;
      }
    }
    return min;
  },

  takeRightWhile(arr, func) {
    const processed = [];
    for (let i = arr.length - 1; i > -1 && func(arr[i]); i -= 1) {
      processed.unshift(arr[i]);
    }
    return processed;
  },

  countBy(arr, func) {
    const fin = {};
    for (let i = 0; i < arr.length; i += 1) {
      const key = func(arr[i]);
      if (key in fin) {
        fin[key] += 1;
      } else {
        fin[key] = 1;
      }
    }
    return fin;
  },

  every(arr, func) {
    for (let i = 0; i < arr.length; i += 1) {
      if (!func(arr[i])) {
        return false;
      }
    }
    return true;
  },

  find(arr, func) {
    for (let i = 0; i < arr.length; i += 1) {
      if (func(arr[i])) {
        return arr[i];
      }
    }
    return undefined;
  },

  groupBy(arr, func) {
    const fin = {};
    for (let i = 0; i < arr.length; i += 1) {
      const key = func(arr[i]);
      if (key in fin) {
        fin[key].push(arr[i]);
      } else {
        fin[key] = [arr[i]];
      }
    }
    return fin;
  },

  some(arr, func) {
    for (let i = 0; i < arr.length; i += 1) {
      if (func(arr[i])) {
        return true;
      }
    }
    return false;
  },
};
console.log(_);


/*
*  lodash functions implemented recursively
*/

const loRecur = {
  dropWhile: function dropWhile(arr, func) {
    if (!func) {
      return arr;
    }
    if (!func(arr[0])) {
      return arr;
    }
    return dropWhile(arr.slice(1), func);
  },

  sortedIndexBy(arr, val, func) {
    const targetValue = func(val);
    return (function find(start = 0, end = arr.length - 1) {
      const middleIndex = Helper.myFloor((start + end) / 2);
      const middleValue = func(arr[middleIndex]);
      if (targetValue === middleValue || start >= end) {
        return (targetValue <= middleValue ? middleIndex : middleIndex + 1);
      }
      if (targetValue > middleValue) {
        return find(middleIndex + 1, end);
      }
      if (targetValue < middleValue) {
        return find(start, middleIndex - 1);
      }
      return undefined;
    }());
  },

  takeRightWhile(array, someFunc) {
    function iter(arr, index, func) {
      if (func(arr[index])) {
        return iter(arr, index + 1, func);
      }
      return arr.slice(0, index);
    }
    return iter(array.reverse(), 0, someFunc);
  },

  countBy: function countBy(arr, func) {
    if (arr.length === 1) {
      return { [func(arr[0])]: 1 };
    }
    const { length } = arr;
    const half = Math.floor(length / 2);
    const left = arr.slice(0, half);
    const right = arr.slice(half, length);
    return Helper.combineCounts(
      {},
      Helper.combineCounts(
        countBy(left, func),
        countBy(right, func),
      ),
    );
  },

  every: function every(arr, func) {
    if (arr.length === 1) {
      return func(arr[0]);
    }
    const { length } = arr;
    const half = Math.floor(length / 2);
    return every(arr.slice(0, half), func) && every(arr.slice(half, length), func);
  },

  find(arr, func) {
    return (function innerFind(index = 0) {
      if (arr[index] === undefined) {
        return undefined;
      } else if (func(arr[index])) {
        return arr[index];
      }
      return innerFind(index + 1);
    }());
  },

  groupBy: function groupBy(arr, func) {
    if (arr.length === 1) {
      return { [func(arr[0])]: arr.slice() };
    }
    const { length } = arr;
    const half = Math.floor(length / 2);
    const left = arr.slice(0, half);
    const right = arr.slice(half, length);
    return Helper.combineArrays(
      {},
      Helper.combineArrays(
        groupBy(left, func),
        groupBy(right, func),
      ),
    );
  },

  some: function some(arr, func) {
    if (arr.length === 1) {
      return func(arr[0]);
    }
    const { length } = arr;
    const half = Math.floor(length / 2);
    return some(arr.slice(0, half), func) || some(arr.slice(half, length), func);
  },
};

module.exports = loRecur;
