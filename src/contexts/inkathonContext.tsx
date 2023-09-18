'use client';
// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

// @ts-ignore
import React from 'react';

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
