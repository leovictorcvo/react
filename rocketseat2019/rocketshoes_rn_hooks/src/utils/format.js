import numeral from 'numeral';

export default function formatPrice(price) {
  return `R$ ${numeral(price).format('0,0.00')}`;
}
