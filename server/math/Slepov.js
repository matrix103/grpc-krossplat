const Slepov = (x, y, t) => {
  return Math.sin(x + (t)) + (t) * Math.sin(y + x);
}

module.exports = { Slepov };
