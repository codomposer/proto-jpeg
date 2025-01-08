import { BN, Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Jpeg } from "@/idl/jpeg";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getProtocolPda } from "./utils";

export const getInitializeProtocolInstruction = async (
  program: Program<Jpeg>,
  authority: PublicKey,
  treasury: PublicKey,
  feeWallet: PublicKey,
  backendWallet: PublicKey,
  minFee: BN,
  maxFee: BN,
  creationFee: BN
) => {
  const [protocol] = getProtocolPda();

  return await program.methods
    .initializeProtocol({
      treasury,
      feeWallet,
      backendWallet,
      minFee,
      maxFee,
      creationFee,
    })
    .accounts({
      protocol,
      authority,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
};

export const getUpdateProtocolInstruction = async (
  program: Program<Jpeg>,
  authority: PublicKey,
  treasury: PublicKey,
  feeWallet: PublicKey,
  backendWallet: PublicKey,
  minFee: BN,
  maxFee: BN,
  creationFee: BN
) => {
  const [protocol] = getProtocolPda();

  return await program.methods
    .updateProtocol({
      treasury,
      feeWallet,
      backendWallet,
      minFee,
      maxFee,
      creationFee,
    })
    .accounts({
      protocol,
      authority,
    })
    .instruction();
};

export const getCreateMarketInstruction = async (
  program: Program<Jpeg>,
  authority: PublicKey,
  feeWallet: PublicKey,
  market: PublicKey,
  marketName: string,
  nftUrl: string,
  targetPrice: BN,
  initialSupply: BN,
  feePercentage: BN,
  lpTokenMint: PublicKey
) => {
  const [protocol] = getProtocolPda();

  return await program.methods
    .createMarket({
      name: marketName,
      nftUrl,
      targetPrice,
      initialSupply,
      feePercentage,
    })
    .accounts({
      protocol,
      market,
      authority,
      feeWallet,
      lpTokenMint,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();
};

export const getUpdateMarketInstruction = async (
  program: Program<Jpeg>,
  authority: PublicKey,
  market: PublicKey,
  newTargetPrice: BN,
  newFeePercentage: BN
) => {
  const [protocol] = getProtocolPda();

  return await program.methods
    .updateMarket({
      newTargetPrice,
      newFeePercentage,
    })
    .accounts({
      protocol,
      market,
      authority,
    })
    .instruction();
};

export const getBuyTokensInstruction = async (
  program: Program<Jpeg>,
  buyer: PublicKey,
  market: PublicKey,
  amount: BN,
  feeWallet: PublicKey,
  lpTokenMint: PublicKey
) => {
  const [protocol] = getProtocolPda();
  const buyerAta = getAssociatedTokenAddressSync(lpTokenMint, buyer);

  return await program.methods
    .buyTokens({
      amount,
    })
    .accounts({
      protocol,
      market,
      buyer,
      feeWallet,
      lpTokenMint,
      buyerTokenAccount: buyerAta,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();
};

export const getSellTokensInstruction = async (
  program: Program<Jpeg>,
  seller: PublicKey,
  market: PublicKey,
  amount: BN,
  feeWallet: PublicKey,
  lpTokenMint: PublicKey
) => {
  const [protocol] = getProtocolPda();
  const sellerAta = getAssociatedTokenAddressSync(lpTokenMint, seller);

  return await program.methods
    .sellTokens({
      amount,
    })
    .accounts({
      protocol,
      market,
      seller,
      feeWallet,
      lpTokenMint,
      sellerTokenAccount: sellerAta,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();
};

export const getWithdrawInstruction = async (
  program: Program<Jpeg>,
  market: PublicKey,
  backendWallet: PublicKey,
  treasury: PublicKey
) => {
  const [protocol] = getProtocolPda();

  return await program.methods
    .withdrawFromMarket()
    .accounts({
      protocol: protocol,
      market: market,
      backend: backendWallet,
      treasury: treasury,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
};