"use client";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

export default function Swap() {
  const { data } = useSWR(
    `https://tokens.coingecko.com/uniswap/all.json`,
    fetcher
  );
  if (data) {
    const token = data?.tokens;
    for (const i in token) {
      // console.log(token[i].symbol);
    }
  }

  return (
    <div className="bg-dark flex justify-center items-center min-h-screen p-4">
      <div
        id="swap"
        className="bg-teal text-dark p-8 rounded-2xl md:max-w-md w-full"
      >
        <h1 className="text-lg font-semibold italic pb-8 cursor-pointer">
          SWAP
        </h1>
        <div className="flex items-center p-2 pl-4 bg-white mb-4 rounded-xl">
          <h3 className="w-1/2 cursor-pointer">Select a token</h3>
          <input
            type="number"
            placeholder="amount"
            className="w-1/2 px-4 py-2 bg-light rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex items-center p-2 pl-4 bg-white mb-8 rounded-xl">
          <h3 className="w-1/2 cursor-pointer">Select a token</h3>
          <input
            type="number"
            placeholder="amount"
            className="w-1/2 px-4 py-2 bg-light rounded-lg focus:outline-none"
          />
        </div>

        <p className="pb-4 pl-1 text-md font-medium">Estimated Gas : </p>
        <button className="p-4 w-full bg-dark text-teal hover:opacity-95 rounded-xl text-lg font-semibold italic">
          SWAP
        </button>
      </div>
    </div>
  );
}
