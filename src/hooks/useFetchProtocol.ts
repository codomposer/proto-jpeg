import { useState, useEffect, useCallback } from 'react';
import useProgram from './useProgram';
import { getProtocolPda } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';

const useFetchProtocol = (reload: {}) => {
  const [protocol, setProtocol] = useState<ProtocolData>();
  const program = useProgram();
  const { publicKey } = useWallet();

  const fetchProtocol = useCallback(async () => {
    if (!program || !publicKey) return;
    try {
      const [protocol] = getProtocolPda();
      const protocolData = await program.account.protocol.fetchNullable(protocol);
      if (protocolData) {
        setProtocol(protocolData);
      } else {
        setProtocol(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  }, [program, publicKey]);

  useEffect(() => {
    fetchProtocol();
  }, [program, fetchProtocol, reload]);

  return { protocol };
};

export default useFetchProtocol;
