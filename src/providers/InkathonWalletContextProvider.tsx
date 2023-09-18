'use client'

import { WsProvider } from '@polkadot/api'
import { UseInkathonProvider, useInkathon } from '@scio-labs/use-inkathon'
import { RPC } from '@/config/common';
import React, { useEffect, useState } from 'react';
import { OpenSelectAccount, OpenSelectWallet } from '@/contexts';

const InkathonWalletContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isSelectWallet, setIsSelectWallet] = useState(false);
  const [isSelectAccount, setIsSelectAccount] = useState(false);

  const selectWalletContext = {
    isOpen: isSelectWallet,
    open: () => {
        setIsSelectWallet(true);
    },
    close: () => {
        setIsSelectWallet(false);
    }
};

const selectAccountContext = {
    isOpen: isSelectAccount,
    open: () => {
        setIsSelectAccount(true);
    },
    close: () => {
        setIsSelectAccount(false);
    }
};

  return (
    <UseInkathonProvider 
    appName='profond' 
    defaultChain="shibuya"
    apiOptions={{
      provider: new WsProvider(RPC),
    }}
    connectOnInit={false}
    >
      <OpenSelectWallet.Provider value={selectWalletContext}>
            <OpenSelectAccount.Provider value={selectAccountContext}>
                {children}
            </OpenSelectAccount.Provider>
        </OpenSelectWallet.Provider>
    </UseInkathonProvider>
  )
}

export default InkathonWalletContextProvider