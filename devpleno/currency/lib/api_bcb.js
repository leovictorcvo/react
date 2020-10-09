const axios = require("axios");

const emptyData = {
  cotacaoVenda: "",
  cotacaoCompra: "",
  dataHoraCotacao: ""
};

const formatDate = date =>
  `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

const getCotacaoAPI = date => {
  const formattedDate = formatDate(date);
  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${formattedDate}'&$format=json`;
  return axios.get(url);
};

const extractCotacao = ({ value }) => {
  if (value[0]) {
    const { cotacaoVenda, cotacaoCompra, dataHoraCotacao } = value[0];
    return {
      cotacaoVenda,
      cotacaoCompra,
      dataHoraCotacao
    };
  } else {
    return emptyData;
  }
};

const getCotacao = ({ getCotacaoAPI, extractCotacao }) => async (
  date = new Date()
) => {
  try {
    const { data } = await getCotacaoAPI(date);
    return extractCotacao(data);
  } catch (err) {
    return emptyData;
  }
};

module.exports = {
  getCotacao: getCotacao({ getCotacaoAPI, extractCotacao }),
  getCotacaoAPI,
  extractCotacao,
  pure: {
    getCotacao
  }
};
