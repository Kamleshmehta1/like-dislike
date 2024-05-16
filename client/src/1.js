const arr = [{ item: 1 }, { item: 1 }, { item: 2 }];

const arr1 = arr.filter((ele, index) => arr.indexOf(ele) === index);

console.log(arr1);

const hashedData = new Map();
arr.forEach((ele) => {
  hashedData.set(ele?.item, (hashedData.get(ele?.item) || 0) + 1);
});

console.log(hashedData);

for (let [key, value] of hashedData) {
  console.log(key, value);
}

hashedData.forEach((ele, keys) => {
  console.log(keys, ele);
});
