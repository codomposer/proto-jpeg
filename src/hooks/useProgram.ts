import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useState, useEffect } from "react";
import { IDL, Jpeg } from "@/idl/jpeg";
import idl from "@/idl/jpeg.json";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const useProgram = () => {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<Program<Jpeg>>();

  useEffect(() => {
    if (!connection) return;
    const provider = new AnchorProvider(
      connection,
      // @ts-ignore
      anchorWallet,
      {
        preflightCommitment: "processed",
      }
    );
    const program = new Program(IDL, idl.metadata.address, provider);
    setProgram(program);
  }, [anchorWallet, connection]);

  return program;
};

export default useProgram;
