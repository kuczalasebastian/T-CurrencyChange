async function fetchExchangeRates() {
    const table = "A";
    const url = `http://api.nbp.pl/api/exchangerates/tables/${table}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data[0].rates;
    } catch (error) {
      console.log("An error occurred while downloading currency rates:", error);
      return null;
    }
  }

  async function convertCurrency(currency, amountPLN) {
    const exchangeRates = await fetchExchangeRates();

    if (exchangeRates) {
      const rate = exchangeRates.find((rate) => rate.code === currency);
      if (rate) {
        const convertedAmount = amountPLN / rate.mid;
        return convertedAmount.toFixed(2);
      }
    }
    return null;
  }

  const convertBtnEUR = document.getElementById("convertBtnEUR");
  const convertBtnUSD = document.getElementById("convertBtnUSD");
  const convertBtnPLN = document.getElementById("convertBtnPLN");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  convertBtnEUR.addEventListener("click", async function () {
    const amountPLN = parseFloat(amountInput.value);
    if (!isNaN(amountPLN)) {
      const convertedAmount = await convertCurrency("EUR", amountPLN);
      if (convertedAmount !== null) {
        resultDiv.innerHTML = `${amountPLN} PLN = ${convertedAmount} EUR`;
      }
    }
  });

  convertBtnUSD.addEventListener("click", async function () {
    const amountPLN = parseFloat(amountInput.value);
    if (!isNaN(amountPLN)) {
      const convertedAmount = await convertCurrency("USD", amountPLN);
      if (convertedAmount !== null) {
        resultDiv.innerHTML = `${amountPLN} PLN = ${convertedAmount} USD`;
      }
    }
  });

  convertBtnPLN.addEventListener("click", function () {
    const amountPLN = parseFloat(amountInput.value);
    if (!isNaN(amountPLN)) {
      resultDiv.innerHTML = `${amountPLN} PLN = ${amountPLN.toFixed(2)} PLN`;
    }
  });