const standardize_color = (str) => {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = str;
  return ctx.fillStyle;
};

export {
  standardize_color,
};
