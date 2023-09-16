'use client';
// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

// @ts-ignore
import { Wallet, WalletAccount } from '@subwallet/wallet-connect/src/types';
import { EvmWallet } from '@subwallet/wallet-connect/types';
import { SetStateAction } from 'jotai';
import React, { Dispatch } from 'react';

export interface WalletContextInterface {
    wallet?: Wallet,
    evmWallet?: EvmWallet,
    accounts: WalletAccount[],
    selectedAccount?: WalletAccount,
    setSelectedAccount?: Dispatch<SetStateAction<WalletAccount>>,
    setWallet: (wallet: Wallet | EvmWallet | undefined, walletType: 'substrate' | 'evm') => void
    walletType: 'substrate' | 'evm';
}

export const WalletContext = React.createContext<WalletContextInterface>({
    accounts: [],
    selectedAccount: undefined ,
    setSelectedAccount: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setWallet: (wallet, walletType: 'substrate' | 'evm') => { },
    walletType: 'substrate'
});

interface OpenSelectWalletInterface {
    isOpen: boolean,
    open: () => void
    close: () => void
}

export const OpenSelectWallet = React.createContext<OpenSelectWalletInterface>({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    open: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close: () => { }
});

interface OpenSelectAccountInterface {
    isOpen: boolean,
    open: () => void
    close: () => void
}

export const OpenSelectAccount = React.createContext<OpenSelectAccountInterface>({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    open: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close: () => { }
});
