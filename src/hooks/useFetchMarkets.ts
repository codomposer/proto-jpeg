import { useState, useEffect, useCallback } from 'react';
import useProgram from './useProgram';
import { useWallet } from '@solana/wallet-adapter-react';

const useFetchMarkets = (reload: {}, name: string) => {
  const [market, setMarket] = useState<MarketData>();
  const [markets, setMarkets] = useState<MarketData[]>();
  const program = useProgram();
  const { publicKey } = useWallet();

  const fetchMarkets = useCallback(async (name: string) => {
    if (!program) return;
    try {
      const markets = (await program.account.market.all()).map(market => market.account);
      setMarkets(markets);

      markets.forEach(market => {
        if (market.name === name) {
          setMarket(market);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [program, publicKey]);

  useEffect(() => {
    fetchMarkets(name);
  }, [program, fetchMarkets, reload, name]);

  return { market, markets };
};

export default useFetchMarkets;