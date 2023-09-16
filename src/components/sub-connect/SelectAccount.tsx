'use client';

import { WalletContext } from "@/contexts";
import { prettyTruncate } from "@/utils/common";
import { WalletAccount } from "@subwallet/wallet-connect/types"
import { useContext } from "react";
import CopyButton from "../ui/CopyButton";

interface Props {
  onSelectAccount: (account: WalletAccount) => void
}

const SelectAccount = ({onSelectAccount}: Props): React.ReactElement<Props> => {
  const walletContext = useContext(WalletContext)
  const accounts = walletContext.accounts

  const accountItem = (account: WalletAccount)=> (
    <div
            className={'wallet-item'}
            key={account.address}
            onClick={()=> onSelectAccount(account)}
        >
            <div className={'wallet-title'}>
              <p className="text-white font-semibold text-lg">{account.name} {walletContext.selectedAccount.address === account.address && <span className="text-green-500">- Active</span>}</p>
              <CopyButton text={account.address} className="flex items-center space-x-2">
                <p className="text-slate-600">{prettyTruncate(account.address, 30, 'address')}</p>
              </CopyButton>
            </div>
        </div>
  )

  return (
    <div className={'select-wallet-wrapper'}>
        <div className={'select-wallet-content'}>
            <div className='dotsama-wallet-list'>
                <div className='wallet-cat-title'>
                    List of account
                </div>
                {accounts.map((account) => (accountItem(account)))}
            </div>
        </div>
    </div>
  )
}

export default SelectAccount