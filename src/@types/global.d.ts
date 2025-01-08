import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

declare global {
  interface ProtocolData {
    authority: PublicKey;
    treasury: PublicKey;
    feeWallet: PublicKey;
    backendWallet: PublicKey;
    minFee: BN;
    maxFee: BN;
    creationFee: BN;
    marketsCount: number;
  }

  interface MarketData {
    authority: PublicKey;
    name: string;
    nftUrl: string;
    targetPrice: BN;
    initialSupply: BN;
    currentSupply: BN;
    feePercentage: BN;
    lpTokenMint: BN;
    marketNumber: BN;
  }
}
