const convertLib = require("./convert");

test("convert throw error if cotacao or quantidade is not a number", () => {
  expect(() => convertLib.convert("a", 4)).toThrowError(
    new Error("Valores inválidos")
  );
  expect(() => convertLib.convert(4, "a")).toThrowError(
    new Error("Valores inválidos")
  );
  expect(() => convertLib.convert("a", "a")).toThrowError(
    new Error("Valores inválidos")
  );
});

test("convert throw error if cotacao or quantidade is negative", () => {
  expect(() => convertLib.convert(-1, 4)).toThrowError(
    new Error("Valores inválidos")
  );
  expect(() => convertLib.convert(4, -1)).toThrowError(
    new Error("Valores inválidos")
  );
});

test("convert cotacao 4 and quantidade 4", () => {
  expect(convertLib.convert(4, 4)).toBe(16);
});

test("convert cotacao 0 and quantidade 4", () => {
  expect(convertLib.convert(0, 4)).toBe(0);
});

test("toMoney converts float", () => {
  expect(convertLib.toMoney(2)).toBe("2.00");
});

test("toMoney converts string to float", () => {
  expect(convertLib.toMoney("2")).toBe("2.00");
});
