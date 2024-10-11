// n 表示n个披萨
let n = 5;
let max = 0;
let pizza = [8, 2, 10, 5, 7];

const check = (idx) => {
  if (idx < 0) {
    return n - 1;
  } else if (idx >= n) {
    return 0;
  } else {
    return idx;
  }
};

const cacheArr = new Array(n).fill(0).map(() => new Array(n).fill(0));

const recursiveFn = (l, r) => {
  if (pizza[l] > pizza[r]) {
    l = check(l - 1);
  } else {
    r = check(r + 1);
  }

  if (cacheArr[l][r] > 0) {
    return cacheArr[l][r];
  }

  if (l === r) {
    cacheArr[l][r] = pizza[l];
  } else {
    cacheArr[l][r] = Math.max(
      recursiveFn(check(l - 1), r) + pizza[l],
      recursiveFn(l, check(r + 1)) + pizza[r]
    );
  }

  return cacheArr[l][r];
};

for (let i = 0; i < n; i++) {
  max = Math.max(max, recursiveFn(check(i - 1), check(i + 1)) + pizza[i]);
}

console.log('最大子： ', max);