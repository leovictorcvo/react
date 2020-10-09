const convert = (cotacao, quantidade) => {
  const val1 = parseFloat(cotacao);
  const val2 = parseFloat(quantidade);
  if (isNaN(val1) || isNaN(val2) || val1 < 0 || val2 < 0) {
    throw new Error("Valores inválidos");
  }
  return val1 * val2;
};

const toMoney = (valor, casasDecimais = 2) =>
  parseFloat(valor).toFixed(casasDecimais);

module.exports = {
  convert,
  toMoney
};
