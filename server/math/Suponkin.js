const Suponkin = (x, y, t) => {
  if (x * y === 0 || x === 100 || y === 100){ // граничное условие
      return 0;
  }
  const dx = 1, dy = 1, dt = 1, alpha = 0.3;
  const z0 = Math.sin(2*x) * Math.cos(5*y);
  const z1 = z0 * Math.exp(-alpha * t * dt);

  return z0 + alpha * dt / (dx * dx) * z0 + alpha * dt / (dy * dy) * z0 + z1 * dt;
};

module.exports = { Suponkin };