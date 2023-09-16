// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
'use client';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { windowReload } from '../utils/window';
import { getWalletBySource } from '@subwallet/wallet-connect/dotsama/wallets';
import { getEvmWalletBySource } from '@subwallet/wallet-connect/evm/evmWallets';
import { EvmWallet, Wallet, WalletAccount } from '@subwallet/wallet-connect/types';
import React, { useCallback, useEffect, useState } from 'react';

import { OpenSelectAccount, OpenSelectWallet, WalletContext, WalletContextInterface } from '../contexts/index';

// interface Props {
//     children: React.ReactElement;
// }

export function WalletContextProvider({ children }: React.PropsWithChildren) {
    const [walletKey, setWalletKey] = useLocalStorage('wallet-key');
    const [walletType, setWalletType] = useLocalStorage('wallet-type', 'substrate');
    const [selectedLocalAccount, setSelectedLocalAccount] = useLocalStorage('selected-account')
    const [currentWallet, setCurrentWallet] = useState<Wallet | EvmWallet | undefined>(getWalletBySource(walletKey));
    const [isSelectWallet, setIsSelectWallet] = useState(false);
    const [isSelectAccount, setIsSelectAccount] = useState(false);
    const [accounts, setAccounts] = useState<WalletAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<WalletAccount|undefined>(undefined)

    const afterSelectWallet = useCallback(
        async (wallet: Wallet) => {
            const infos = await wallet.getAccounts();

            if(infos){
                setAccounts(infos);
                if(selectedLocalAccount){
                    setSelectedAccount(JSON.parse(selectedLocalAccount))
                }
                else{
                    setSelectedLocalAccount(JSON.stringify(infos[0]))
                    setSelectedAccount(infos[0])
                }
                    
            } 
        },
        []
    );

    const selectWallet = useCallback(
        async (wallet: Wallet) => {
            setCurrentWallet(currentWallet);

            await wallet.enable();
            setWalletKey(wallet.extensionName);

            await afterSelectWallet(wallet);
        },
        [afterSelectWallet, currentWallet, setWalletKey]
    );

    const afterSelectEvmWallet = useCallback(
        async (wallet: EvmWallet) => {
            await wallet?.enable(); // Quick call extension?.request({ method: 'eth_requestAccounts' });
        },
        []
    );

    const selectEvmWallet = useCallback(
        async (wallet: EvmWallet) => {
            await afterSelectEvmWallet(wallet);

            setCurrentWallet(currentWallet);

            setWalletKey(wallet.extensionName);

            windowReload();
        },
        [afterSelectEvmWallet, currentWallet, setWalletKey]
    );

    const walletContext = {
        wallet: getWalletBySource(walletKey),
        evmWallet: getEvmWalletBySource(walletKey),
        accounts,
        selectedAccount,
        setSelectedAccount,
        setWallet: (wallet: Wallet | EvmWallet | undefined, walletType: 'substrate' | 'evm') => {
            if (walletType === 'substrate') {
                wallet && selectWallet(wallet as Wallet);
            } else {
                wallet && selectEvmWallet(wallet as EvmWallet);
            }

            wallet && setWalletType(walletType);
        },
        walletType
    };

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

    useEffect(
        () => {
            if (walletType === 'substrate') {
                const wallet = getWalletBySource(walletKey);

                setTimeout(() => {
                    if (wallet && wallet?.installed) {
                        // eslint-disable-next-line no-void
                        void afterSelectWallet(wallet);
                    }
                }, 150);
            } else {
                const evmWallet = getEvmWalletBySource(walletKey);

                evmWallet && evmWallet?.isReady.then(() => {
                    afterSelectEvmWallet(evmWallet).catch(console.error);
                });
            }
        },
        [afterSelectEvmWallet, afterSelectWallet, walletKey, walletType]
    );

    return <WalletContext.Provider value={walletContext as WalletContextInterface}>
        <OpenSelectWallet.Provider value={selectWalletContext}>
            <OpenSelectAccount.Provider value={selectAccountContext}>
                {children}
            </OpenSelectAccount.Provider>
        </OpenSelectWallet.Provider>
    </WalletContext.Provider>;
}