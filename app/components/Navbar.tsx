"use client";
import { Button } from "../components/ConnectButton";

export default function Navbar() {
  return (
    <div className="p-4 bg-dark text-teal flex justify-between  items-center ">
      <a href="/" className="text-xl font-bold italic">
        SWAP
      </a>
      <Button />
    </div>
  );
}
