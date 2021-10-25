import axios from "axios";
import config from "../config";
export const returnQuote = function () {
  return axios.request({
    method: "GET",
    url: "https://quotes15.p.rapidapi.com/quotes/random/",
    headers: {
      "x-rapidapi-key": `${config.Quote_API_KEY}`,
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  });
};
