"use client";

export default function Navbar() {
  const connect = () => {
    console.log(`Connecting wallet`);
  };

  return (
    <div className="p-4 bg-dark text-teal flex justify-between  items-center ">
      <a href="/" className="text-xl font-bold italic">
        SWAP
      </a>
      <div className="flex">
        <button
          onClick={connect}
          className="px-4 py-2 bg-teal text-dark hover:scale-105 italic text-sm font-normal rounded-lg"
        >
          Connect wallet
        </button>
      </div>
    </div>
  );
}
