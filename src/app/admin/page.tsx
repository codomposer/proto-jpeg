"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { solanaPublicKeyRegex } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import useProgram from "@/hooks/useProgram";
import useFetchProtocol from "@/hooks/useFetchProtocol";
import { initializeProtocol, updateProtocol } from "@/lib/methods";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { toast } from "react-toastify";

const formSchema = z.object({
  treasury: z.string().regex(solanaPublicKeyRegex, {
    message: "Invalid Solana public key format.",
  }),
  feeWallet: z.string().regex(solanaPublicKeyRegex, {
    message: "Invalid Solana public key format.",
  }),
  backendWallet: z.string().regex(solanaPublicKeyRegex, {
    message: "Invalid Solana public key format.",
  }),
  minFee: z
    .number()
    .min(0, { message: "MIN_FEE must be at least 0." })
    .max(100, { message: "MIN_FEE must not exceed 100." }),
  maxFee: z
    .number()
    .min(0, { message: "MIN_FEE must be at least 0." })
    .max(100, { message: "MIN_FEE must not exceed 100." }),
  creationFee: z
    .number()
    .min(0, { message: "MIN_FEE must be at least 0." })
    .max(10, { message: "MIN_FEE must not exceed 10." }),
});

const AdminPage = () => {
  const wallet = useWallet();
  const program = useProgram();
  const [reload, setReload] = useState({});
  const { protocol } = useFetchProtocol(reload);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInitializeProtocol = async (
    values: z.infer<typeof formSchema>
  ) => {
    if (!program || !wallet.publicKey) return;

    setIsInitializing(true);
    try {
      const res = await initializeProtocol(
        wallet,
        program,
        new PublicKey(values.treasury),
        new PublicKey(values.feeWallet),
        new PublicKey(values.backendWallet),
        new BN(values.minFee * 100),
        new BN(values.maxFee * 100),
        new BN(values.creationFee * LAMPORTS_PER_SOL)
      );
      if (res) {
        setReload({});
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.error("Error Initialize Protocol:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to Initialize market."
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const handleUpdateProtocol = async (values: z.infer<typeof formSchema>) => {
    if (!program || !wallet.publicKey) {
      console.log("Missing required dependencies:", {
        program: !!program,
        walletPublicKey: !!wallet.publicKey,
      });
      toast.error("Please connect your wallet and try again.");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await updateProtocol(
        wallet,
        program,
        new PublicKey(values.treasury),
        new PublicKey(values.feeWallet),
        new PublicKey(values.backendWallet),
        new BN(values.minFee * 100),
        new BN(values.maxFee * 100),
        new BN(values.creationFee * LAMPORTS_PER_SOL)
      );
      if (res) {
        setReload({});
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.error("Error Update Protocol:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update market."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treasury: "",
      feeWallet: "",
      backendWallet: "",
      minFee: 0.5,
      maxFee: 2.5,
      creationFee: 0.01,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    !protocol ? handleInitializeProtocol(values) : handleUpdateProtocol(values);
  }

  useEffect(() => {
    if (!protocol) return;

    form.setValue("treasury", protocol.treasury.toString());
    form.setValue("feeWallet", protocol.feeWallet.toString());
    form.setValue("backendWallet", protocol.backendWallet.toString());
    form.setValue("minFee", protocol.minFee / 1e2);
    form.setValue("maxFee", protocol.maxFee / 1e2);
    form.setValue("creationFee", protocol.creationFee / LAMPORTS_PER_SOL);
  }, [protocol]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="treasury"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Treasury</FormLabel>
              <FormControl>
                <Input placeholder="Treasury wallet public key" {...field} />
              </FormControl>
              <FormDescription>Enter the treasury public key.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feeWallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee Wallet</FormLabel>
              <FormControl>
                <Input placeholder="Fee wallet public key" {...field} />
              </FormControl>
              <FormDescription>
                Enter the fee wallet public key.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="backendWallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Backend Wallet</FormLabel>
              <FormControl>
                <Input placeholder="Backend wallet public key" {...field} />
              </FormControl>
              <FormDescription>
                Enter the backend wallet public key.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Fee (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Minimum fee"
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Fee (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Maximum fee"
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creationFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creation Fee (SOL)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Creation fee"
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {!protocol
            ? isInitializing
              ? "Initializing Protocol..."
              : "Initialize Protocol"
            : isUpdating
              ? "Updating Protocol..."
              : "Update Protocol"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminPage;
