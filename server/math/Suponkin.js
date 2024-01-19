const Suponkin = (x, y, t) => {
  if (x < 0)
    x = 0;
  if (x > 100)
    x = 0;
  if (y < 0)
    y = 0;
  if (y > 100)
    y = 0;
  return Math.sin(x / 6) * Math.sin( y / 6);
};

module.exports = { Suponkin };