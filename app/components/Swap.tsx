"use client";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

export default function Swap() {
  const [token, setToken] = useState(false);
  const [tokenSwap, setTokenSwap] = useState(false);

  const [selectToken, setSelectToken] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [wholeToken, setWholeToken] = useState(0);

  const [selectTokenSwap, setSelectTokenSwap] = useState("");
  const [tokenSwapPrice, setTokenSwapPrice] = useState(0);
  const [wholeTokenSwap, setWholeTokenSwap] = useState(0);

  const [modal, setModal] = useState(false);
  const { data } = useSWR(
    `https://api.wazirx.com/sapi/v1/tickers/24hr`,
    fetcher
  );

  const handleSwap = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const number = document.getElementById("number") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;

    const wholeTokenPrice = tokenPrice * Number(number?.value);
    setWholeToken(Number(number?.value));

    const wholeTokenSwapPrice = Number(wholeTokenPrice / tokenSwapPrice);
    setWholeTokenSwap(wholeTokenSwapPrice);

    state.value = "" + Math.trunc(wholeTokenSwapPrice);
    setModal(true);
  };

  const handleConfirmSwap = (e: { preventDefault: any }) => {
    e.preventDefault();
    console.log(`${selectToken} : ${wholeToken}`);
    console.log(`${selectTokenSwap} : ${wholeTokenSwap}`);
  };

  return (
    <div className="bg-dark flex justify-center items-center min-h-screen p-4 ">
      <form
        id="swap"
        onSubmit={handleSwap}
        className={`bg-teal text-dark p-8 rounded-2xl sm:max-w-md w-full static ${
          modal ? "blur-sm sm:blur-none" : "blur-none"
        }`}
      >
        <div className="flex items-center p-2 pl-4 bg-white mb-4 rounded-xl">
          <h3
            onClick={() => {
              setToken(!token);
              setTokenSwap(false);
            }}
            className={`w-1/2 cursor-pointer ${
              selectToken != "" ? "font-medium" : "font-normal"
            }`}
          >
            {selectToken === "" ? "Select a token" : selectToken.toUpperCase()}
          </h3>
          <input
            required
            type="number"
            id="number"
            onChange={() => {
              // const state = document.getElementById(
              //   "state"
              // ) as HTMLInputElement;
              // state.value = "";
              const number = document.getElementById(
                "number"
              ) as HTMLInputElement;
              const state = document.getElementById(
                "state"
              ) as HTMLInputElement;

              const wholeTokenPrice = tokenPrice * Number(number?.value);
              setWholeToken(wholeTokenPrice);

              const wholeTokenSwapPrice = Number(
                wholeTokenPrice / tokenSwapPrice
              );
              setWholeTokenSwap(wholeTokenSwapPrice);

              state.value = "" + Math.trunc(wholeTokenSwapPrice);
            }}
            placeholder="amount"
            className="w-1/2 px-4 py-2 bg-light rounded-lg focus:outline-none"
          />
        </div>
        {token && (
          <div className="w-full h-80 mb-4 overflow-y-auto rounded-xl bg-white cursor-pointer">
            <div className="flex justify-between items-center px-4 py-2 border-b border-grey">
              <p>Tokens</p>
              <p
                onClick={() => setToken(false)}
                className="cursor-pointer text-xl"
              >
                <IoIosCloseCircleOutline />
              </p>
            </div>
            {data?.map(
              (token: {
                symbol: string;
                baseAsset: string;
                openPrice: number;
              }) => (
                <div
                  key={token.symbol}
                  className="flex px-4 py-2 border-b border-grey"
                  onClick={() => {
                    setToken(false);
                    setSelectToken(token?.baseAsset);
                    setTokenPrice(token?.openPrice);
                    const state = document.getElementById(
                      "state"
                    ) as HTMLInputElement;
                    state.value = "";
                  }}
                >
                  <p>
                    <span className="font-medium">
                      {token.baseAsset.toUpperCase()}
                    </span>
                  </p>
                </div>
              )
            )}
          </div>
        )}
        <div
          onClick={() => {
            setTokenSwap(!tokenSwap);
            setToken(false);
            setTokenSwapPrice(0);
            const state = document.getElementById("state") as HTMLInputElement;
            state.value = "";
          }}
          className="flex items-center p-2 pl-4 bg-white mb-4 rounded-xl"
        >
          <h3
            className={`w-1/2 cursor-pointer ${
              selectTokenSwap != "" ? "font-medium" : "font-normal"
            }`}
          >
            {selectTokenSwap === ""
              ? "Select a token"
              : selectTokenSwap.toUpperCase()}
          </h3>
          <input
            type="number"
            id="state"
            placeholder="amount"
            className="w-1/2 px-4 py-2 bg-light rounded-lg focus:outline-none"
          />
        </div>
        {tokenSwap && (
          <div className="w-full h-80 mb-4 overflow-y-auto rounded-xl bg-white cursor-pointer">
            <div className="flex justify-between items-center px-4 py-2 border-b border-grey">
              <p>Tokens</p>
              <p
                onClick={() => setTokenSwap(false)}
                className="cursor-pointer text-xl"
              >
                <IoIosCloseCircleOutline />
              </p>
            </div>
            {data?.map(
              (token: {
                symbol: string;
                baseAsset: string;
                openPrice: number;
              }) => (
                <div
                  key={token.symbol}
                  className="flex px-4 py-2 border-b border-grey"
                  onClick={() => {
                    setTokenSwap(false);
                    setSelectTokenSwap(token?.baseAsset);
                    setTokenSwapPrice(token?.openPrice);
                  }}
                >
                  <p>
                    <span className="font-medium">
                      {token.baseAsset.toUpperCase()}
                    </span>
                  </p>
                </div>
              )
            )}
          </div>
        )}

        <p className="pb-4 pl-1 text-md font-medium">Estimated Gas : </p>
        <button className="p-4 w-full bg-dark text-teal hover:opacity-95 rounded-xl text-lg font-semibold italic">
          SWAP
        </button>
      </form>
      {modal && (
        <form
          onSubmit={handleConfirmSwap}
          className="bg-white text-dark absolute top-1/3 p-8 mx-4 rounded-2xl w-4/5
      sm:max-w-md"
        >
          <div className="flex justify-between border-b border-dark">
            <h3 className="text-lg font-semibold pb-4">Review Swap</h3>
            <p
              onClick={() => setModal(false)}
              className="cursor-pointer text-xl"
            >
              <IoIosCloseCircleOutline />
            </p>
          </div>
          <div className="py-4">
            <p className="text-sm font-normal pb-2">You pay : </p>
            <div className="flex justify-between">
              <p className="text-lg font-semibold">
                {Number(wholeToken).toFixed(2)}{" "}
              </p>
              <p className="text-lg font-bold">{selectToken.toUpperCase()}</p>
            </div>
          </div>
          <div className="py-4 pb-8">
            <p className="text-sm font-normal pb-2">You get : </p>
            <div className="flex justify-between">
              <p className="text-lg font-semibold">
                {Number(wholeTokenSwap).toFixed(2)}{" "}
              </p>
              <p className="text-lg font-bold">
                {selectTokenSwap.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-teal text-dark text-xl font-bold italic p-4 w-full rounded-xl border border-dark"
          >
            CONFIRM SWAP
          </button>
        </form>
      )}
    </div>
  );
}

/*
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
const { data } = useSWR(`https://api.wazirx.com/sapi/v1/tickers/24hr`, (url) =>
  fetcherWithHeaders(url)
);
*/
