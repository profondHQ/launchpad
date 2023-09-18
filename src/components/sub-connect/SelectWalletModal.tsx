// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
'use client';

import './SelectWallet.scss';

import { Modal } from 'antd';
import React, { useContext, useEffect } from 'react';

import { OpenSelectWallet } from '@/contexts';
import SelectWallet from './SelectWallet';
import { SubstrateChain, SubstrateWallet, useInkathon } from '@scio-labs/use-inkathon';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Props {
    theme: string;
}

function SelectWalletModal({ theme }: Props): React.ReactElement<Props> {
    const openSelectWalletContext = useContext(OpenSelectWallet)
    const [wallet, setWallet] = useLocalStorage('wallet');
    const [chain, setChain] = useLocalStorage('chain');
    const {connect} = useInkathon()



    const onSelectWallet = async(chain?: SubstrateChain, wallet?: SubstrateWallet)=> {
        await connect?.(chain, wallet)
        setChain(JSON.stringify(chain))
        setWallet(JSON.stringify(wallet))
        openSelectWalletContext.close()
    }

    return <Modal
        centered
        className={`select-wallet-modal ${theme === 'dark' ? '-dark' : '-light'}`}
        footer={false}
        maskStyle={{ backgroundColor: theme === 'dark' ? '#262C4A' : '#EEE' }}
        onCancel={openSelectWalletContext.close}
        title='Select Wallet'
        open={openSelectWalletContext.isOpen}
        wrapClassName={'sub-wallet-modal-wrapper'}
    >
        <SelectWallet onSelectWallet={onSelectWallet} />
    </Modal>;
}

export default SelectWalletModal;
