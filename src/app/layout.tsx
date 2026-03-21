import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AA Paymaster | @samdevrel",
  description: "Account Abstraction gas sponsorship - pay fees in any token with ERC-4337 paymasters",
  keywords: ["account-abstraction", "erc-4337", "paymaster", "gas-sponsorship", "web3"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
