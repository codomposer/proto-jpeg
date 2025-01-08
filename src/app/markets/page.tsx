"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import useProgram from "@/hooks/useProgram";
import { buyTokens, sellTokens } from "@/lib/methods";
import { useEffect, useMemo, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useFetchProtocol from "@/hooks/useFetchProtocol";
import useFetchMarkets from "@/hooks/useFetchMarkets";
import { getMarketPda } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import useBalance from "@/hooks/useBalance";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BONDING_CURVE_PARAM_A, BONDING_CURVE_PARAM_B } from "@/config";

const MarketsPage = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const program = useProgram();
  const [reload, setReload] = useState({});
  const [marketName, setMarketName] = useState("");
  const [marketPda] = getMarketPda(marketName);
  const { protocol } = useFetchProtocol(reload);
  const { market, markets } = useFetchMarkets(reload, marketName);
  const [amount, setAmount] = useState(0);
  const { lpTokenBalance } = useBalance({ market });
  const isMarketCreator =
    market && market.authority.toString() === wallet.publicKey?.toString();
  const [isReadyToBuy, setIsReadyToBuy] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isSelling, setIsSelling] = useState(false);

  useEffect(() => {
    const fetchMarketSolBalance = async () => {
      if (market) {
        try {
          const marketSolBalance = await connection.getBalance(marketPda);
          if (marketSolBalance > (market.targetPrice * 110) / 100) {
            setIsReadyToBuy(true);
          } else {
            setIsReadyToBuy(false);
          }
        } catch (error) {
          console.error("Failed to fetch market SOL balance:", error);
          setIsReadyToBuy(false);
        }
      }
    };

    fetchMarketSolBalance();
  }, [market, marketPda, connection]);

  const handleBuy = async () => {
    if (!program || !protocol || !market) {
      console.log("Missing required dependencies:", {
        program: !!program,
        walletPublicKey: !!wallet.publicKey,
      });
      toast.error("Please connect your wallet and try again.");
      return;
    }

    setIsBuying(true);
    try {
      const res = await buyTokens(
        wallet,
        program,
        marketPda,
        new BN(amount * 1e9),
        protocol.feeWallet,
        market.lpTokenMint
      );
      if (res) {
        setReload({});
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.error("Error buying token:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to buy token."
      );
    } finally {
      setIsBuying(false);
    }
  };

  const handleSell = async () => {
    if (!program || !protocol || !market) {
      console.log("Missing required dependencies:", {
        program: !!program,
        walletPublicKey: !!wallet.publicKey,
      });
      toast.error("Please connect your wallet and try again.");
      return;
    }

    setIsSelling(true);
    try {
      const res = await sellTokens(
        wallet,
        program,
        marketPda,
        new BN(amount * 1e9),
        protocol.feeWallet,
        market.lpTokenMint
      );
      if (res) {
        setReload({});
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.error("Error selling token:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to sell token."
      );
    } finally {
      setIsSelling(false);
    }
  };

  const handleWithdraw = async () => {
    //   if (!program || !protocol || !market) return;
    //   const res = await withdraw(wallet, program, marketPda, market.winTokenMint);
    //   if (res) {
    //     setReload({});
    //     toast.success("Success");
    //   } else {
    //     toast.error("Failed");
    //   }
  };

  const tokenPrice = useMemo(() => {
    if (market) {
      const basePricePerToken =
        (BONDING_CURVE_PARAM_A * market.currentSupply.toNumber()) / 1e9 +
        BONDING_CURVE_PARAM_B;

      const adjustedPricePerToken =
        (basePricePerToken / 1e9) * market.targetPrice.toNumber();
      return adjustedPricePerToken;
    }
    return 0;
  }, [market]);

  // const handleResolveOutcome = async () => {
  //   if (!program || !market || !isMarketCreator) return;

  //   const res = await resolveOutcome(wallet, program, marketPda, yesOrNo);
  //   if (res) {
  //     setReload({});
  //     toast.success("Success");
  //   } else {
  //     toast.error("Failed");
  //   }
  // };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label>Market Name:</label>

        <div className="flex w-full">
          <Select
            onValueChange={(value) => {
              setMarketName(value);
            }}
          >
            <SelectTrigger className="!w-[300px]">
              <SelectValue placeholder="Select a Market" />
            </SelectTrigger>
            <SelectContent>
              {markets &&
                markets.map((market) => (
                  <SelectItem key={market.name} value={market.name}>
                    {market.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {market && (
        <>
          {!!isReadyToBuy && <label>It is ready to buy token now.</label>}
          <label>Current Supply: {market.currentSupply.toNumber() / 1e9}</label>
          <label>Price per token: {tokenPrice / 1e9} SOL</label>
          <label>My LP token balance: {lpTokenBalance}</label>

          <div className="flex gap-2 items-center">
            <label>Amount:</label>
            <Input
              type="number"
              placeholder="Enter amount"
              min="0"
              step="1"
              className="w-[230px]"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              onClick={handleBuy}
              variant="outline"
              className="bg-green-500 text-white"
            >
              {isBuying ? "Buying..." : "Buy"}
            </Button>
            <Button
              onClick={handleSell}
              variant="outline"
              className="bg-red-500 text-white"
            >
              {isSelling ? "Selling..." : "Sell"}
            </Button>
          </div>
          {isReadyToBuy && (
            <button
              onClick={handleWithdraw}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Withdraw
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MarketsPage;
