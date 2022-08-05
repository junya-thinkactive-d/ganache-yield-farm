import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  paths: {
    artifacts: '../client/src/libs/hardhat/artifacts',
  },
};

export default config;
