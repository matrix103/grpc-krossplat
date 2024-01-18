const {singularize} = require("sequelize/lib/utils");
const Sokolov = (x, y, t) => {
  if (x < 0)
    x = 0;
  if (x > 300)
    x = 300;
  if (y < 0)
    y = 0;
  if (y > 100)
    y = 100;

  return 10 + 5 * Math.cos(x / 3) * Math.sin(y);
};

module.exports = { Sokolov };

