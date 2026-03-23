'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'pay' | 'approve' | 'transfer';
  from: string;
  to: string;
  amount: number;
  gasCost: number;
  sponsor?: string;
  token: string;
}

interface Sponsorship {
  token: string;
  balance: number;
  totalSponsored: string;
  sponsorCount: number;
}

const transactions: Transaction[] = [
  {
    id: 'TX-001',
    type: 'pay',
    from: '0x7a...9f2e',
    to: '0x3c...1d4a',
    amount: 5,
    gasCost: 0.015,
    sponsor: 'Coinbase',
    token: 'USDC',
  },
  {
    id: 'TX-002',
    type: 'approve',
    from: '0x5f...7a8b',
    to: '0x2a...9c1d',
    amount: 1000,
    gasCost: 0.008,
    token: 'USDT',
  },
  {
    id: 'TX-003',
    type: 'transfer',
    from: '0x2a...9c1d',
    to: '0x7a...9f2e',
    amount: 150,
    gasCost: 0.012,
    token: 'DAI',
  },
  {
    id: 'TX-004',
    type: 'pay',
    from: '0x3c...1d4a',
    to: '0x5f...7a8b',
    amount: 25,
    gasCost: 0.02,
    sponsor: 'Binance',
    token: 'USDC',
  },
];

const sponsorships: Sponsorship[] = [
  { token: 'USDC', balance: 500000, totalSponsored: '$2.5M', sponsorCount: 1250 },
  { token: 'USDT', balance: 350000, totalSponsored: '$8.2M', sponsorCount: 3100 },
  { token: 'ETH', balance: 5000, totalSponsored: '$15M', sponsorCount: 450 },
  { token: 'DAI', balance: 280000, totalSponsored: '$5.1M', sponsorCount: 980 },
];

export default function Home() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isSponsoring, setIsSponsoring] = useState(false);

  const sponsorGas = async () => {
    setIsSponsoring(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSponsoring(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-purple-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">AA Paymaster</h1>
              <p className="text-gray-400 mt-2">Account Abstraction gas sponsorship - pay fees in any token</p>
            </div>
            <nav className="flex gap-2">
              <a href="/" className="px-4 py-2 bg-gray-800 border-2 border-gray-600 hover:border-purple-400 rounded font-bold transition-all">Home</a>
              <a href="/docs" className="px-4 py-2 bg-purple-500 border-2 border-purple-400 rounded font-bold transition-all">Docs</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-purple-400 p-4 text-center">
            <div className="text-3xl font-black text-purple-400">$15M+</div>
            <div className="text-sm text-gray-400">Total Sponsored</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">5,430</div>
            <div className="text-sm text-gray-400">Active Sponsorships</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">$3.2M</div>
            <div className="text-sm text-gray-400">Saved by Users</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">4</div>
            <div className="text-sm text-gray-400">Token Types</div>
          </div>
        </section>

        {/* Sponsor Gas Button */}
        <button
          onClick={sponsorGas}
          disabled={isSponsoring}
          className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          {isSponsoring ? 'Sponsoring Gas...' : 'Sponsor Gas for User'}
        </button>

        {/* Transactions */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">From</th>
                  <th className="text-left py-3">To</th>
                  <th className="text-right py-3">Amount</th>
                  <th className="text-right py-3">Gas</th>
                  <th className="text-left py-3">Token</th>
                  <th className="text-left py-3">Sponsor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className={`border-b border-gray-800 cursor-pointer hover:bg-gray-800 ${
                      selectedTx?.id === tx.id ? 'bg-purple-900/20' : ''
                    }`}
                  >
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs font-bold ${
                        tx.type === 'pay' ? 'bg-green-900 text-green-400' :
                        tx.type === 'approve' ? 'bg-blue-900 text-blue-400' :
                        'bg-yellow-900 text-yellow-400'
                      }`}>
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-xs">{tx.from}</td>
                    <td className="py-3 font-mono text-xs">{tx.to}</td>
                    <td className="py-3 text-right">{tx.amount}</td>
                    <td className="py-3 text-right text-gray-400">${tx.gasCost.toFixed(3)}</td>
                    <td className="py-3 text-xs">{tx.token}</td>
                    <td className="py-3 text-xs">{tx.sponsor || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Selected Transaction */}
        {selectedTx && (
          <section className="bg-gray-900 border-4 border-purple-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-purple-400">{selectedTx.type.toUpperCase()}</h2>
                <p className="text-sm text-gray-400">{selectedTx.id}</p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">From</div>
                  <div className="font-mono">{selectedTx.from}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">To</div>
                  <div className="font-mono">{selectedTx.to}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Amount</div>
                  <div className="font-bold">{selectedTx.amount}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Gas Cost</div>
                  <div className="font-bold text-gray-400">${selectedTx.gasCost.toFixed(3)}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Token</div>
                  <div className="font-bold">{selectedTx.token}</div>
                </div>
              </div>
              {selectedTx.sponsor && (
                <div className="p-3 bg-purple-900/30 border border-purple-500 text-center">
                  <span className="text-sm text-purple-400">Gas Sponsored by</span>
                  <div className="font-bold text-xl">{selectedTx.sponsor}</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Sponsorships */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Active Sponsorships</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sponsorships.map((sponsor) => (
              <div
                key={sponsor.token}
                className="p-4 bg-gray-800 border-2 border-purple-400"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-2xl">{sponsor.token}</span>
                  </div>
                  <div className="text-xs text-gray-400">{sponsor.sponsorCount.toLocaleString()} sponsors</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Balance</span>
                    <span className="font-bold">{(sponsor.balance / 1000).toFixed(1)}K {sponsor.token}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Sponsored</span>
                    <span className="font-bold text-purple-400">{sponsor.totalSponsored}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How AA Paymasters Work</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">User Connects</h3>
              <p className="text-xs text-gray-400">App signs a paymaster transaction</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Paymaster Funds</h3>
              <p className="text-xs text-gray-400">Sponsor deposits gas tokens</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Gas Paid</h3>
              <p className="text-xs text-gray-400">User pays in any token, gas in ETH</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Post-Sponsor</h3>
              <p className="text-xs text-gray-400">App tracks sponsor balance</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-900 border-4 border-blue-400 p-6">
          <h2 className="text-xl font-black text-blue-400 mb-4">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="font-bold text-purple-400 mb-2">Pay in Any Token</h3>
              <p className="text-sm text-gray-400">Users can pay gas fees in USDC, USDT, DAI - not just ETH</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-bold text-green-400 mb-2">Gas Sponsorship</h3>
              <p className="text-sm text-gray-400">DApps sponsor gas for users onboarding to Web3</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-bold text-blue-400 mb-2">Session Keys</h3>
              <p className="text-sm text-gray-400">Temporary limited permissions for secure access</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-purple-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
