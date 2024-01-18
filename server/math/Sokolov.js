const Sokolov = (x, y, t) => {
  if (x * y === 0 || x >= 300 || y >= 100) {
    return 0;
  }
  return 10 + 5 * Math.cos(y / 3) * Math.sin(y);
};

module.exports = { Sokolov };

