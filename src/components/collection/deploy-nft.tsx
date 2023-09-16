'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Transition } from '@/components/ui/transition';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
import Preview from '@/components/create-nft/nft-preview';
import FormCollection from '@/components/collection/form-collection';
import UploadAsset from '@/components/collection/upload-asset';

//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import PriceType from '@/components/create-nft/price-types-props';
import { CheckmarkIcon } from '@/components/icons/checkmark';

import { ChangeEvent, useContext } from 'react';
import { WsProvider, ApiPromise } from '@polkadot/api'
import { BlueprintPromise } from '@polkadot/api-contract'
import { RPC } from '@/config/common';
import metadata_psp22 from '@/config/metadata/psp22';
import { coinConfig } from '@/config/coin';
import { Check } from '../icons/check';
import { WalletContext } from '@/contexts';
import { BN, stringCamelCase } from '@polkadot/util'
import metadata_psp34 from '@/config/metadata/psp34';
import { collectionConfig } from '@/config/collection';

export default function DeployNFT({metadataColl, setMetadataColl}: {metadataColl: any, setMetadataColl: any}) {
  const {selectedAccount, wallet} = useContext(WalletContext)
  const [deployed, setDeployed] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDeployCollection = async()=>{
    setLoading(true)
    const startAt = new Date(metadataColl.public_sale_start_at).getTime()
    const endedAt = new Date(metadataColl.public_sale_end_at).getTime()
    const pricePerMint = new BN(metadataColl.price_per_mint).mul(new BN((10 ** 18).toString()))
    const maxSupply = parseInt(metadataColl.max_supply)

    try{
        const wsProvider = new WsProvider(RPC);
        const api = await ApiPromise.create({ provider: wsProvider })
        const signer = wallet?.signer
        api.setSigner(signer)
        const bluerprint = new BlueprintPromise(api, metadata_psp34, collectionConfig.code_hash)
        const tx = bluerprint.tx[stringCamelCase('new')]({
        gasLimit: '4000',
        storageDepositLimit: null,
        value: 0
      }, ...(metadataColl && [
        metadataColl.name, 
        metadataColl.symbol, 
        metadataColl.base_uri, 
        maxSupply, 
        '0',
        '0',
        pricePerMint, 
        0,
        0,
        startAt, 
        endedAt,
        metadataColl.launchpad_fee,
        metadataColl.project_treasury,
        metadataColl.launchpad_treasury
      ]))
      await tx.signAndSend(selectedAccount?.address, async(result: any)=> {
        if (result.status.isInBlock || result.status.isFinalized) {
          setLoading(false)
          setDeployed(true)
        }
      })
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-xl">
            Deploy NFT
          </h4>
        </div>
      </div>
      <div className="mb-8">
        <button onClick={onDeployCollection} className="rounded-lg w-full h-44 border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6 cursor-pointer transition-all">
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium tracking-wider text-gray-900 dark:text-white sm:text-sm">
              {loading ? 'Deploying...' : deployed ? 'Deployed' : 'Deploy NFT'}

              {deployed && <CheckmarkIcon />}
            </p>
          </div>
        </button>
      </div>
    </>
  );
}
