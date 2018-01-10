/* eslint no-console: 'off' */

/*
* Select lodash functions implemented iteratively
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
* Select lodash functions implemented recursively
*/

const loRecur = {
  dropWhile(arr, func) {
    //
  },

  sortedIndexBy(arr, val) {
    return (function find(start = 0, end = arr.length - 1) {
      const mid = Math.floor((start + end) / 2);
      if (start >= end) {
        return (val >= arr[mid] ? mid : mid - 1);
      }
      if (val > arr[mid]) {
        return find(mid + 1, end);
      }
      return find(start, mid - 1);
    }());
  },

  takeRightWhile(arr, func) {
    //
  },

  countBy(arr, func) {
    //
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
    //
  },

  groupBy(arr, func) {
    //
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

console.log(loRecur);

loRecur.sortedIndexBy([1, 4, 7, 11, 44], 10);