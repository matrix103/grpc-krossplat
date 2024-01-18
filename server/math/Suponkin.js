const Suponkin = (x, y, t) => {
  if (x < 0)
    x = 0;
  if (x > 100)
    x = 100;
  if (y < 0)
    y = 0;
  if (y > 100)
    y = 100;
  return Math.sin(x / 6) * Math.cos(5 * y / 6);
};

module.exports = { Suponkin };