export const getData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2]);
  }, 1000);
});