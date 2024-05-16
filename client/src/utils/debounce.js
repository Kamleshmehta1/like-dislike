export function handleDebounce(cb, delay) {
  let timer;
  return function (...params) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...params);
    }, delay);
  };
}
