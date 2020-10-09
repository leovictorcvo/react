const api = require("./api_bcb");
const axios = require("axios");

jest.mock("axios");

const cotacao = {
  cotacaoVenda: 3.9,
  cotacaoCompra: 3.8,
  dataHoraCotacao: "2019 11 27 08:36:53"
};

const semCotacao = {
  cotacaoVenda: "",
  cotacaoCompra: "",
  dataHoraCotacao: ""
};

const res = {
  data: {
    value: [cotacao]
  }
};

describe("extractCotacao", () => {
  test("Cotação existente", () => {
    const { data } = res;
    const resp = api.extractCotacao(data);
    expect(resp).toEqual(cotacao);
  });
  test("Cotação vazia", () => {
    const empty = api.extractCotacao({ value: [] });
    expect(empty).toEqual(semCotacao);
  });
});

test("getCotacaoAPI", async () => {
  axios.get.mockResolvedValue(res);
  const resp = await api.getCotacaoAPI(new Date("2019-11-27 11:36:53"));
  expect(resp).toEqual(res);
});

describe("getCotacao", () => {
  test("chamada sem data", async () => {
    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockResolvedValue(res);

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(cotacao);

    const getCotacaoPure = api.pure.getCotacao({
      getCotacaoAPI,
      extractCotacao
    });
    const resp = await getCotacaoPure();
    expect(resp).toEqual(cotacao);
  });

  test("com cotacao", async () => {
    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockResolvedValue(res);

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(cotacao);

    const getCotacaoPure = api.pure.getCotacao({
      getCotacaoAPI,
      extractCotacao
    });
    const resp = await getCotacaoPure(new Date("2019-11-27 11:36:53"));
    expect(resp).toEqual(cotacao);
  });

  test("com exceção", async () => {
    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockReturnValue(Promise.reject("error"));

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue = cotacao;

    const getCotacaoPure = api.pure.getCotacao({
      getCotacaoAPI,
      extractCotacao
    });
    const resp = await getCotacaoPure(new Date("2019-11-27 11:36:53"));
    expect(resp).toEqual(semCotacao);
  });
});
