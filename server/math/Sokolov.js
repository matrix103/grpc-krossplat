const Sokolov = (x, y, t) => {
  let func = 0;
  for (let p = 1; p < 10; p++) {
    for (let q = 1; q < 10; q++) {
      func += ((256 * Math.cos(4 * Math.PI * t) * Math.sqrt(((2 * p - 1) ** 2) / 4 + (2 * q - 1) ** 2)) / ((2 * p - 1) ** 3) * (2 * q - 1) ** 3 * Math.PI ** 6) * Math.sin((2 * p - 1) * Math.PI * x / 2) * Math.sin(2 * q - 1) * Math.PI * y;
    }
  }
  return func;
};

module.exports = { Sokolov };

