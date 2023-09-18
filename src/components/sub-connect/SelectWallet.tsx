// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
'use client';

import { SubstrateChain, SubstrateWallet, allSubstrateChains, allSubstrateWallets, isWalletInstalled } from '@scio-labs/use-inkathon';
// import { getWallets } from '@subwallet/wallet-connect/dotsama/wallets';
// import { getEvmWallets } from '@subwallet/wallet-connect/evm/evmWallets';
// import { EvmWallet, Wallet } from '@subwallet/wallet-connect/types';
import React, { useState } from 'react';
import Button from '../ui/button';
import { Check } from '../icons/check';

require('./SelectWallet.scss');

interface Props {
    // onSelectWallet: (walletKey: string, walletType?: 'substrate' | 'evm') => void
    onSelectWallet: (chain?: SubstrateChain, wallet?: SubstrateWallet) => void
}

function SelectWallet({ onSelectWallet }: Props): React.ReactElement<Props> {
    const [selectedChain, setSelectedChain] = useState<SubstrateChain|undefined>(undefined)
    const [selectedWallet, setSelectedWallet] = useState<SubstrateWallet|undefined>(undefined)

    const chainItem: (chain: SubstrateChain) => React.ReactElement = (chain) => (
        <div
            className={'wallet-item'}
            key={chain.name}
            onClick={()=> setSelectedChain(chain)}
        >
            <div className={'wallet-title'}>
                {chain.name}
            </div>
            <div className={'wallet-install flex items-center'}>
                {selectedChain?.name === chain.name && <Check color='green' width={18} height={18} className='inline mx-2' />}
                {chain.testnet && 'testnet'}
            </div>
        </div>
    );

    const walletItem: (wallet: SubstrateWallet) => React.ReactElement = (wallet) => (
        <div
            className={'wallet-item'}
            key={wallet.id}
            onClick={()=> setSelectedWallet(wallet)}
        >
            <div>
                <img
                    alt={wallet.id}
                    className={'wallet-logo'}
                    // @ts-ignore
                    src={wallet.logoUrls[0]}
                />
            </div>
            <div className={'wallet-title'}>
                {wallet.name}
            </div>
            <div className={'wallet-install flex items-center'}>
                {selectedWallet?.id === wallet.id && <Check color='green' width={18} height={18} className='inline mx-2' />}
                {isWalletInstalled(wallet)
                    ? ''
                    : (<a
                        href={wallet.urls.chromeExtension}
                        rel='noreferrer'
                        target='_blank'
                    >
                        Install
                    </a>)}
            </div>
        </div>
    );

    return <div className={'select-wallet-wrapper'}>
        <div className={'select-wallet-content'}>
            <div className='dotsama-wallet-list mb-4'>
                <div className='wallet-cat-title'>
                    Substrate Chains
                </div>
                <div className='overflow-y-auto max-h-52'>
                    {allSubstrateChains.map((chain) => (chainItem(chain)))}
                </div>
            </div>
            <div className='dotsama-wallet-list mb-4'>
                <div className='wallet-cat-title'>
                    Substrate Wallets
                </div>
                <div className='overflow-y-auto max-h-52'>
                    {allSubstrateWallets.map((wallet) => (walletItem(wallet)))}
                </div>
            </div>
            <Button disabled={!selectedChain || !selectedWallet} variant="solid" color="primary" className='w-full' onClick={()=> onSelectWallet(selectedChain, selectedWallet)}>Select</Button>
            {/* <div className='evm-wallet-list'>
                <div className='wallet-cat-title'>
                    EVM Wallets
                </div>
                {evmWallets.map((wallet) => (walletItem(wallet, onClickEvmWallet)))}
            </div> */}
        </div>
    </div>;
}

export default SelectWallet;
