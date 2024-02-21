import { ConnectButton } from "@rainbow-me/rainbowkit";
export const Button = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-teal text-dark px-4 py-2 hover:scale-105 italic text-sm font-normal rounded-lg"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-teal text-dark px-4 py-2 hover:scale-105 italic text-sm font-normal rounded-lg"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-x-4">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center bg-teal text-dark px-4 py-2 italic text-sm font-normal rounded-lg"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 18, height: 18 }}
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name} */}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center bg-teal text-dark px-4 py-2 italic text-sm font-normal rounded-lg"
                  >
                    {account.displayName}
                    <span className="font-medium ml-2">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
