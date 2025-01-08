"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProgram from "@/hooks/useProgram";
import { toast } from "react-toastify";
import { createMarket } from "@/lib/methods";
import useFetchProtocol from "@/hooks/useFetchProtocol";

const formSchema = z.object({
  nftUrl: z.string().url({ message: "Valid URL is required." }),
  targetPrice: z
    .number()
    .min(0, { message: "Target price must be at least 0." }),
  initialSupply: z
    .number()
    .min(0, { message: "Initial supply must be at least 0." }),
  feePercentage: z
    .number()
    .min(0, { message: "Fee percentage must be non-negative." }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateMarketPage = () => {
   const wallet = useWallet();
  const program = useProgram();
  const [reload, setReload] = useState({});
  const { protocol } = useFetchProtocol(reload);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nftUrl:
        "https://magiceden.us/item-details/ethereum/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/135",
      targetPrice: 100,
      initialSupply: 0,
      feePercentage: 2.5,
    },
  });

  const handleCreateMarket = async (values: FormValues) => {
    console.log("handleCreateMarket called with values:", values);

    if (!program || !wallet.publicKey) {
      console.log("Missing required dependencies:", {
        program: !!program,
        walletPublicKey: !!wallet.publicKey,
      });
      toast.error("Please connect your wallet and try again.");
      return;
    }

    if (!protocol) {
      toast.error("Protocol data is not available. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      const marketName = "Test Market-" + protocol.marketsCount;

      await createMarket(
        wallet,
        program,
        protocol.feeWallet,
        marketName,
        values.nftUrl,
        new BN(values.targetPrice * LAMPORTS_PER_SOL),
        new BN(values.initialSupply),
        new BN(values.feePercentage * 100)
      );

      toast.success("Market created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error creating market:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create market."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateMarket)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="nftUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NFT URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter NFT URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Price (SOL)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter target price"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialSupply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Supply</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter initial supply"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feePercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee Percentage (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter fee percentage"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || !wallet.publicKey}>
          {isSubmitting ? "Creating Market..." : "Create Market"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateMarketPage;
