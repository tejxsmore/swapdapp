"use client";
import useSWR from "swr";
import { Key, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

export default function Swap() {
  const [token, setToken] = useState(false);
  const [tokenSwap, setTokenSwap] = useState(false);
  const { data } = useSWR(
    `https://tokens.coingecko.com/uniswap/all.json`,
    fetcher
  );

  return (
    <div className="bg-dark flex justify-center items-center min-h-screen p-4">
      <div
        id="swap"
        className="bg-teal text-dark p-8 rounded-2xl md:max-w-md w-full static"
      >
        <div className="flex items-center p-2 pl-4 bg-white mb-4 rounded-xl">
          <h3
            onClick={() => {
              setToken(true);
              setTokenSwap(false);
            }}
            className="w-1/2 cursor-pointer"
          >
            Select a token
          </h3>
          <input
            type="number"
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
            {data?.tokens.map(
              (token: {
                address: Key | null | undefined;
                symbol: string | undefined;
                logoURI: string | undefined;
              }) => (
                <div
                  key={token.address}
                  className="flex px-4 py-2 border-b border-grey"
                >
                  <img
                    src={token.logoURI}
                    alt="token"
                    className="w-5 h-5 mr-4 rounded-full"
                  />
                  <p>{token.symbol}</p>
                </div>
              )
            )}
          </div>
        )}
        <div
          onClick={() => {
            setTokenSwap(true);
            setToken(false);
          }}
          className="flex items-center p-2 pl-4 bg-white mb-4 rounded-xl"
        >
          <h3 className="w-1/2 cursor-pointer">Select a token</h3>
          <input
            type="number"
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
            {data?.tokens.map(
              (token: {
                address: Key | null | undefined;
                symbol: string | undefined;
                logoURI: string | undefined;
              }) => (
                <div
                  key={token.address}
                  className="flex px-4 py-2 border-b border-grey"
                >
                  <img
                    src={token.logoURI}
                    alt="token"
                    className="w-5 h-5 mr-4 rounded-full"
                  />
                  <p>{token.symbol}</p>
                </div>
              )
            )}
          </div>
        )}

        <p className="pb-4 pl-1 text-md font-medium">Estimated Gas : </p>
        <button className="p-4 w-full bg-dark text-teal hover:opacity-95 rounded-xl text-lg font-semibold italic">
          SWAP
        </button>
      </div>
    </div>
  );
}
