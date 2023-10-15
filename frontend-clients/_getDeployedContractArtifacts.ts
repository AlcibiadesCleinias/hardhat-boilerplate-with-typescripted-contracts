// We have deployments of hardhat-deploy and current chain.
// We want to get contract artifacts for the chain.

import {readFileSync, readdirSync} from "fs";

const DEPLOYMENTS_PATH = "./deployments"
const CHAIN_ID_FILENAME = ".chainId"

type artifactsType = {
    abi: any,
    address: string
}

type deployedContractArtifactsType = {
    name: string,
    artifacts: artifactsType
};

// It returns first contract artifacts of matched one from the DEPLOYMENTS_PATH dir.
export function _getDeployedContractArtifacts(chainId: number, contractName: string): deployedContractArtifactsType {
    const dirFiles = readdirSync(DEPLOYMENTS_PATH)
    if (contractName === "") {
        return
    }
    for (let i=0; i < dirFiles.length; i++) {
        const chainDir = dirFiles[i]
        const currentPath = DEPLOYMENTS_PATH + "/" + chainDir + "/"
        const chainIdPath = currentPath + CHAIN_ID_FILENAME
        const chainIdFile = readFileSync(chainIdPath, "utf-8")
        const contractFile = readFileSync(currentPath + "/" + contractName + ".json", "utf-8")

        const readChainId = JSON.parse(chainIdFile)
        if (Number(readChainId) !== chainId) {
            continue
        }

        const readContractFile = JSON.parse(contractFile)
        return {name: chainDir, artifacts: readContractFile}
    }
}
