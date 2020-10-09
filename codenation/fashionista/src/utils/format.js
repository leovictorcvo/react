const formatPrice = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format;

const parseStringToFloat = text =>
  parseFloat(text.replace(/[^0-9,]/g, '').replace(',', '.'));

export { formatPrice, parseStringToFloat };
