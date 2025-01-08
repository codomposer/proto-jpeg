/* eslint-disable react-hooks/exhaustive-deps */
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

export default function useBalance({ market }: { market?: MarketData }) {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [lpTokenBalance, setLpTokenBalance] = useState(0);

  const fetchBalance = useCallback(async () => {
    if (market && publicKey) {
      const { lpTokenMint } = market;

      const lpAta = getAssociatedTokenAddressSync(lpTokenMint, publicKey);

      try {
        const {
          value: { uiAmount: yesBalance },
        } = await connection.getTokenAccountBalance(lpAta);
        setLpTokenBalance(yesBalance!);
      } catch (error) {
        setLpTokenBalance(0);
      }
    }
  }, [market, publicKey]);

  useEffect(() => {
    fetchBalance();
  }, [market, publicKey]);

  return { lpTokenBalance };
}
