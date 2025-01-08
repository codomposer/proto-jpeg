import { BN, Program } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Jpeg } from "@/idl/jpeg";
import {
  getInitializeProtocolInstruction,
  getUpdateProtocolInstruction,
  getCreateMarketInstruction,
  getUpdateMarketInstruction,
  getBuyTokensInstruction,
  getSellTokensInstruction,
} from "./instructions";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { MARKET_SEED } from "@/config";

export async function initializeProtocol(
  wallet: WalletContextState,
  program: Program<Jpeg>,
  treasury: PublicKey,
  feeWallet: PublicKey,
  backendWallet: PublicKey,
  minFee: BN,
  maxFee: BN,
  creationFee: BN
) {
  if (!wallet.publicKey) return;
  try {
    const transaction = new Transaction();
    transaction.add(
      await getInitializeProtocolInstruction(
        program,
        wallet.publicKey,
        treasury,
        feeWallet,
        backendWallet,
        minFee,
        maxFee,
        creationFee
      )
    );

    const txSignature = await wallet.sendTransaction(
      transaction,
      program.provider.connection
    );

    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature,
    });
    console.log(txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error in initializeProtocol:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Transaction failed: ${errorMessage}`);
  }
}

export async function updateProtocol(
  wallet: WalletContextState,
  program: Program<Jpeg>,
  treasury: PublicKey,
  feeWallet: PublicKey,
  backendWallet: PublicKey,
  minFee: BN,
  maxFee: BN,
  creationFee: BN
) {
  if (!wallet.publicKey) return;
  try {
    const transaction = new Transaction();
    transaction.add(
      await getUpdateProtocolInstruction(
        program,
        wallet.publicKey,
        treasury,
        feeWallet,
        backendWallet,
        minFee,
        maxFee,
        creationFee
      )
    );

    const txSignature = await wallet.sendTransaction(
      transaction,
      program.provider.connection
    );
    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature,
    });
    console.log(txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error in updateProtocol:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Transaction failed: ${errorMessage}`);
  }
}

export async function createMarket(
  wallet: WalletContextState,
  program: Program<Jpeg>,
  feeWallet: PublicKey,
  marketName: string,
  nftUrl: string,
  targetPrice: BN,
  initialSupply: BN,
  feePercentage: BN
) {
  if (!wallet.publicKey) return;

  try {
    // Generate market PDA
    const [marketPda] = await PublicKey.findProgramAddressSync(
      [Buffer.from(MARKET_SEED), Buffer.from(marketName)],
      program.programId
    );
    const market = marketPda;

    // Generate keypair for LP token mint
    const lpTokenMintKeypair: Keypair = Keypair.generate();
    const lpTokenMint: PublicKey = lpTokenMintKeypair.publicKey;

    // Create the transaction
    const createMarketIx = await getCreateMarketInstruction(
      program,
      wallet.publicKey,
      feeWallet,
      market,
      marketName,
      nftUrl,
      targetPrice,
      initialSupply,
      feePercentage,
      lpTokenMint
    );

    // Send transaction
    const txSignature = await wallet.sendTransaction(
      new Transaction().add(createMarketIx),
      program.provider.connection,
      {
        skipPreflight: true,
        signers: [lpTokenMintKeypair],
      }
    );

    // Wait for confirmation
    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature,
    });

    console.log("Transaction signature:", txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error in createMarket:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Transaction failed: ${errorMessage}`);
  }
}

export async function updateMarket(
  wallet: WalletContextState,
  program: Program<Jpeg>,
  market: PublicKey,
  newTargetPrice: BN,
  newFeePercentage: BN
) {
  if (!wallet.publicKey) return;
  try {
    const transaction = new Transaction();
    transaction.add(
      await getUpdateMarketInstruction(
        program,
        wallet.publicKey,
        market,
        newTargetPrice,
        newFeePercentage
      )
    );

    const txSignature = await wallet.sendTransaction(
      transaction,
      program.provider.connection
    );

    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature,
    });
    console.log(txSignature);
    return txSignature;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function buyTokens(
  wallet: WalletContextState,
  program: Program<Jpeg>,
  market: PublicKey,
  amount: BN,
  feeWallet: PublicKey,
  lpTokenMint: PublicKey
) {
  if (!wallet.publicKey) return;
  try {
    const transaction = new Transaction();
    transaction.add(
      await getBuyTokensInstruction(
        program,
        wallet.publicKey,
        market,
        amount,
        feeWallet,
        lpTokenMint
      )
    );

    const txSignature = await wallet.sendTransaction(
      transaction,
      program.provider.connection,
      {
        skipPreflight: true,
      }
    );

    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature,
    });

    console.log(txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error in buyTokens:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Transaction failed: ${errorMessage}`);
  }
}

export async function sellTokens(
  wallet: WalletContextState,
  program: Program<Jpeg>,
  market: PublicKey,
  amount: BN,
  feeWallet: PublicKey,
  lpTokenMint: PublicKey
) {
  if (!wallet.publicKey) return;
  try {
    const transaction = new Transaction();
    const sellerAta = getAssociatedTokenAddressSync(
      lpTokenMint,
      wallet.publicKey
    );
    transaction.add(
      await getSellTokensInstruction(
        program,
        wallet.publicKey,
        market,
        amount,
        feeWallet,
        lpTokenMint
      )
    );

    const txSignature = await wallet.sendTransaction(
      transaction,
      program.provider.connection,
      {
        skipPreflight: true,
      }
    );

    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txSignature,
    });

    console.log(txSignature);
    return txSignature;
  } catch (error) {
    console.error("Error in sellTokens:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Transaction failed: ${errorMessage}`);
  }
}
