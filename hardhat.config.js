require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Change these for different networks
// Polygon Amoy TEST NET
const ALCHEMY_URL_POLYGON_AMOY = `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
// Polygon MAIN NET
const ALCHEMY_URL_POLYGON_MAINNET = `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
// Ethereum Sepolia TEST NET
const ALCHEMY_URL_SEPOLIA = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
// Ethereum MAIN NET
const ALCHEMY_URL_MAINNET = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonAmoy: POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  defaultNetwork: "polygonAmoy", // hardhat for testing, change this for different networks
  networks: {
    hardhat: {
      chainId: 31337,
    },
    polygonAmoy: {
      url: ALCHEMY_URL_POLYGON_AMOY,
      accounts: [TEST_WALLET_PRIVATE_KEY],
      gasPrice: 35000000000,
      chainId: 80002,
    },
    polygon: {
      url: ALCHEMY_URL_POLYGON_MAINNET,
      accounts: [TEST_WALLET_PRIVATE_KEY],
      gasPrice: 35000000000,
      chainId: 137,
    },
    sepolia: {
      url: ALCHEMY_URL_SEPOLIA,
      accounts: [TEST_WALLET_PRIVATE_KEY],
      gasPrice: 35000000000,
      chainId: 11155111,
    },
    ethereum: {
      url: ALCHEMY_URL_MAINNET,
      accounts: [TEST_WALLET_PRIVATE_KEY],
      gasPrice: 35000000000,
      chainId: 1,
    },
  },
  solidity: {
    version: "0.8.20", // use an exact version here and in contract to avoid verification problems
    settings: {
      optimizer: {
        enabled: false, // may cause verification problems if true
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
