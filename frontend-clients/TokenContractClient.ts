import {Token} from "../typechain-types";
import {BigNumber, ethers} from "ethers";


export class TokenContractClient {
    protected contractAddress: string;
    public contract: Token;

    public signer: ethers.providers.JsonRpcSigner;
    protected confirmations_number: number | undefined;
    protected abi: any;
    private _signerAddress: string = "";

    constructor(
        signer: ethers.providers.JsonRpcSigner,
        abi: any,
        address: string,
        confirmations_number?: number,
    ) {
        // To prevent cross contract interaction.
        this.contractAddress = address
        this.signer = signer
        this.abi = abi
        this.contract = new ethers.Contract(this.contractAddress, this.abi, signer) as Token;
        this.contract = this.contract.connect(signer)
        this.confirmations_number = confirmations_number
    }

    // convenience method to parse eth to wei.
    parseEthToWei(v: number) {
        return ethers.utils.parseEther(String(v));
    }

    // It parses to max 4 decimal places.
    parseWeiToEth(v: number | string) {
        const bigNumberV = BigNumber.from(v)
        const remainder = bigNumberV.mod(1e14);
        return ethers.utils.formatEther(bigNumberV.sub(remainder));
    }

    // Await signer address or return cached one.
    async getSignerAddress() {
        if (this._signerAddress === "") {
            this._signerAddress = await this.signer.getAddress()
        }
        return this._signerAddress
    }

    // @param amount: ETH to send.
    async transfer(to: string, amount: number) {
        const tx = await this.contract.transfer(to, this.parseEthToWei(amount))
        console.log("Called transfer got tx = ", tx)
    }
}
