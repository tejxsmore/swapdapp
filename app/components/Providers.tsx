"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  Theme,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "Swap",
  projectId: "a4b5e297d7a364ea7c88daf917cc14a1",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet],
    },
  ],
  chains: [
    mainnet,
    sepolia,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: "",
  },
  colors: {
    accentColor: "#1B2430",
    accentColorForeground: "#15F5BA",
    actionButtonBorder: "#15F5BA",
    actionButtonBorderMobile: "#15F5BA",
    actionButtonSecondaryBackground: "",
    closeButton: "#1B2430",
    closeButtonBackground: "",
    connectButtonBackground: "...",
    connectButtonBackgroundError: "...",
    connectButtonInnerBackground: "...",
    connectButtonText: "...",
    connectButtonTextError: "...",
    connectionIndicator: "...",
    downloadBottomCardBackground: "...",
    downloadTopCardBackground: "...",
    error: "...",
    generalBorder: "#15F5BA",
    generalBorderDim: "...",
    menuItemBackground: "...",
    modalBackdrop: "#1B2430",
    modalBackground: "#15F5BA",
    modalBorder: "#15F5BA",
    modalText: "#1B2430",
    modalTextDim: "#1B2430",
    modalTextSecondary: "#1B2430",
    profileAction: "...",
    profileActionHover: "...",
    profileForeground: "#15F5BA",
    selectedOptionBorder: "#15F5BA",
    standby: "...",
  },
  fonts: {
    body: "...",
  },
  radii: {
    actionButton: "5px",
    connectButton: "...",
    menuButton: "10px",
    modal: "20px",
    modalMobile: "20px",
  },
  shadows: {
    connectButton: "...",
    dialog: "...",
    profileDetailsAction: "...",
    selectedOption: "...",
    selectedWallet: "...",
    walletLogo: "...",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
