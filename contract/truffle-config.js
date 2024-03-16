const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = 'd6ab40693c783f7eda2ac17fe8166ea93350015c54358ff1fb7f5a03d2d7dd18'; // 実際の秘密鍵に置き換えてください
const sepoliaOptimismUrl = 'https://optimism-sepolia.infura.io/v3/97d8fe442f3b403ea32b4d0c4fdacc6f'; // OP SepoliaのPublic RPC URL

module.exports = {
  networks: {
    // OP Sepoliaの設定を追加
    op_sepolia: {
      provider: () => new HDWalletProvider(privateKey, sepoliaOptimismUrl),
      network_id: 11155420, // OP SepoliaのChain ID
      gas: 5500000, // ガスの上限, 必要に応じて調整してください
      gasPrice: 15000000, // ガス価格, 必要に応じて調整してください
      skipDryRun: false // ドライランをスキップ
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0" // Solidityコンパイラのバージョンを0.8.0以上に指定
    }
  }
  // コンパイラの設定等、その他の設定
};
