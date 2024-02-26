"use client";
import useSWR from "swr";
import axios from "axios";

const fetcherWithHeaders = (url: string) => {
  return axios
    .get(`${url}`, {
      headers: {
        api_key: process.env.API_KEY,
        secret_key: process.env.SECRET_KEY,
      },
    })
    .then((response) => response.data);
};

export default function Testing() {
  const { data } = useSWR(
    `https://api.wazirx.com/sapi/v1/tickers/24hr`,
    (url) => fetcherWithHeaders(url)
  );
  console.log(data);
}
