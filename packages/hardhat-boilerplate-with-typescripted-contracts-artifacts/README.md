# hardhat-boilerplate-with-typescripted-contracts-artifacts
Package consists of following artifacts useful for ZkTurk contract interaction:
- `contracts/` - `json` artifacts of the contracts. Useful contract **abi** are here, 
- `typechain-types/` - typechain-types of all contracts [optional],
- `frontend-clients` - frontend oriented classes those need only [optional]
signer and abi to initiate and then used to interact with contract logic. Kinda API with the contracts in the blockchain.

# Install 
```bash
npm i hardhat-boilerplate-with-typescripted-contracts-artifacts
```

# Example Repo Code
Script code that you may run with `ts-node <script.ts>` is below:

```typescript
import {Token} from "hardhat-boilerplate-with-typescripted-contracts-artifacts/dist/typechain-types";
import {ethers} from "ethers";
// For the line below "resolveJsonModule": true policy should be used.
import ZkTurkArtifacts
    from "hardhat-boilerplate-with-typescripted-contracts-artifacts/dist/contracts/ZkTurk.sol/ZkTurk.json";
import {
    TokenContractClient
} from "hardhat-boilerplate-with-typescripted-contracts-artifacts/dist/frontend-clients/TokenContractClient";

// ZkTurk contract deployed address (You should know the address).
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// Hardhat network localhost (You should have node available on rpc).
const rpcProviderUrl = "http://localhost:8545"

async function workWithFrontendClientExample() {
    // Bad example of how to use wallet from a private key.
    const privateKeyFoo = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"  // From Hardhat network.
    const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl)  // harhdat localhost
    const signer = new ethers.Wallet(privateKeyFoo, provider);

    // RM ts-ignore if uses real frontend provider, like commented below:
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner()
    // @ts-ignore
    const client = new TokenContractClient(signer, ZkTurkArtifacts.abi, contractAddress)

    console.log('client.transfer()', await client.transfer('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 1))
}


async function workWithContractExample() {
    const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl)
    const contractInstance = new ethers.Contract(contractAddress, ContractArtifacts.abi, provider) as Token;

    // Signer is not needed for contract call
    console.log('await contractInstance.owner()', await contractInstance.owner())
}


async function main() {
    console.log('Starting...')
    await workWithContractExample()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

## Example of tsconfig.json
```json
{
  "compilerOptions": {
    "incremental": true,            /* Enable incremental compilation */
    "target": "es5",                /* Specify ECMAScript target version: */
    "module": "commonjs",           /* 'none', 'commonjs', 'amd', 'system', etc */
    "declaration": true,            /* Concatenate & emit output to single file.*/
    "outDir": "dist",                /* Redirect output to the directory. */
    "esModuleInterop": true,        /* Enables intero between CommonJS and ES */
    "skipLibCheck": true,           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true, /* Disallow inconsistently */
    "resolveJsonModule": true
  }
}
```

## Example of package.json dependency entities
```
  "dependencies": {
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  },
  "devDependencies": {
    "@types/node": "^20.4.0"
  }
```
