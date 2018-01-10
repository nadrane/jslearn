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
console.log(loRecur);
