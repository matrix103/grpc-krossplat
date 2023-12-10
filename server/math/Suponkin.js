const Suponkin = (x, y, t) => {
  const alpha = 0.3, dx = 1, dy = 1, dt = 1;

  const z0 = Math.sin(Math.PI * x) * Math.sin(Math.PI * y);
  const sourceTerm = Math.sin(Math.PI * x) * Math.cos(Math.PI * y) * Math.exp(-alpha * t * dt);
  return z0 + alpha * dt / (dx * dx) * z0 + alpha * dt / (dy * dy) * z0 + sourceTerm * dt;
};

// const Suponkin = (x, y, t) => {
//   const alpha = 0.3, dx = 0.1, dy = 0.1, dt = 0.1
//   let z0 = Math.sin(Math.PI * x) * Math.sin(Math.PI * y);
//   const z1 = Math.sin(Math.PI * (x - dx)) * Math.sin(Math.PI * y);
//   const z2 = Math.sin(Math.PI * (x + dx)) * Math.sin(Math.PI * y);
//   const z3 = Math.sin(Math.PI * x) * Math.sin(Math.PI * (y - dy));
//   const z4 = Math.sin(Math.PI * x) * Math.sin(Math.PI * (y + dy));
//   const sourceTerm = Math.sin(Math.PI * x) * Math.cos(Math.PI * y) * Math.exp(-alpha * t * dt);
//
//   return z0 + alpha * dt / (dx * dx) * (z1 + z2 - 2 *z0) + alpha * dt / (dy * dy) * (z3 + z4 - 2*z0) + sourceTerm * dt;
// }

module.exports = { Suponkin };

