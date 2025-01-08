import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PublicKey } from "@solana/web3.js";
import idl from "@/idl/jpeg.json";
import { MARKET_SEED, PROTOCOL_SEED } from "@/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const solanaPublicKeyRegex = /^[A-HJ-NP-Za-km-z1-9]{32,44}$/;

export const getProtocolPda = (
  programId: PublicKey = new PublicKey(idl.metadata.address)
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PROTOCOL_SEED)],
    programId
  );
};

export const getMarketPda = (
  name: string,
  programId: PublicKey = new PublicKey(idl.metadata.address)
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(MARKET_SEED), Buffer.from(name)],
    programId
  );
};

export const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const getMetadataPda = (
  mint: PublicKey,
  programId: PublicKey = METADATA_PROGRAM_ID
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), programId.toBuffer(), mint.toBuffer()],
    programId
  );
};
