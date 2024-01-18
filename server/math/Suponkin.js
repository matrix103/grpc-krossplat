const Suponkin = (x, y, t) => {
  if (x * y === 0 || x >= 100 || y >= 100) {
    return 0;
  }
  return Math.sin(x / 6) * Math.cos(5 * y / 6);
};

module.exports = { Suponkin };