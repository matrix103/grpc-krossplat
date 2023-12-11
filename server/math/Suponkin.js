const Suponkin = (x, y, t) => {
  const dx = 1, dy = 1, dt = 1, alpha=0.3;
  let z0 = Math.sin(2*x) * Math.sin(5*y);
  const sourceTerm = Math.sin(2*x) * Math.cos(5*y) * Math.exp(-alpha * t * dt);

  return z0 + alpha * dt / (dx * dx) * z0 + alpha * dt / (dy * dy) * z0 + sourceTerm * dt;
};

module.exports = { Suponkin };

