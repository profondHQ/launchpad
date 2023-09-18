'use client';

import { Modal } from "antd"
import SelectAccount from "./SelectAccount"
import { useContext } from "react";
import { OpenSelectAccount } from "@/contexts";
import { WalletAccount } from "@subwallet/wallet-connect/types";
import './SelectAccount.scss';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useInkathon } from "@scio-labs/use-inkathon";

interface Props {
  theme: string;
}

const SelectAccountModal = ({theme}: Props): React.ReactElement<Props> => {
  const openSelectAccountContext = useContext(OpenSelectAccount)
  // const walletContext = useContext(WalletContext)
  const [selectedLocalAccount, setSelectedLocalAccount] = useLocalStorage('selected-account');
  const {setActiveAccount} = useInkathon()

  const onSelectAccount = (account: WalletAccount)=>{
    setActiveAccount?.(account)
    setSelectedLocalAccount(JSON.stringify(account))
    openSelectAccountContext.close()
  }


  return (
    <Modal
    centered
    className={`select-account-modal ${theme === 'dark' ? '-dark' : '-light'}`}
    footer={false}
    maskStyle={{ backgroundColor: theme === 'dark' ? '#262C4A' : '#EEE', opacity: 0.6 }}
    onCancel={openSelectAccountContext.close}
    title='Select Account'
    open={openSelectAccountContext.isOpen}
    wrapClassName={'sub-wallet-modal-wrapper'}
    >
      <SelectAccount onSelectAccount={onSelectAccount}  />
    </Modal>
  )
}

export default SelectAccountModal