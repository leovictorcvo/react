const express = require("express");
const path = require("path");

const convertLib = require("./lib/convert");
const apiBcd = require("./lib/api_bcb");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const cotacao = await apiBcd.getCotacao();
  res.render("home", {
    cotacao: cotacao.cotacaoVenda || 0,
    mensagem: cotacao.dataHoraCotacao
      ? `Cotação de ${cotacao.dataHoraCotacao}`
      : "Sem cotação para hoje"
  });
});

app.get("/cotacao", (req, res) => {
  const { cotacao, quantidade } = req.query;
  if (cotacao && quantidade) {
    const conversao = convertLib.convert(cotacao, quantidade);

    res.render("cotacao", {
      cotacao: convertLib.toMoney(cotacao, 4),
      quantidade: convertLib.toMoney(quantidade),
      conversao: convertLib.toMoney(conversao),
      error: false
    });
  } else {
    res.render("cotacao", { error: "Valores inválidos" });
  }
});

app.listen(3000, err => {
  if (err) {
    console.log("Error at server start:", err.message);
  }

  console.log("ConvertMyMoney is running");
});
