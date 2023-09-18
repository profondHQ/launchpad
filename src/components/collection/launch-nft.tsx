'use client';

import { useContext, useEffect, useState } from 'react';
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
import DeployNFT from '@/components/collection/deploy-nft';

//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import PriceType from '@/components/create-nft/price-types-props';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { WalletContext } from '@/contexts';

const BlockchainOptions = [
  {
    id: 1,
    name: 'Ethereum',
    value: 'ethereum',
    icon: <Ethereum />,
  },
  {
    id: 2,
    name: 'Flow',
    value: 'flow',
    icon: <Flow />,
  },
];

export default function LauchNFT() {
  const {selectedAccount} = useContext(WalletContext)
  const stepMenu = [
    {
      id: 1,
      name: 'Details',
    },
    {
      id: 2,
      name: 'Upload',
    },
    {
      id: 3,
      name: 'Deploy',
    },
    {
      id: 4,
      name: 'Success',
    },
  ];
  const [step, setStep] = useState(1);
  const [metadataColl, setMetadataColl] = useState({
    name: '',
    symbol: '',
    base_uri: '',
    max_supply: 0,
    price_per_mint: 0,
    public_sale_start_at: 0,
    public_sale_end_at: 0,
    launchpad_fee: 0,
    project_treasury: selectedAccount?.address,
    launchpad_treasury: selectedAccount?.address,
  })

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleNext = () => {
    setStep(step + 1);
  };

  useEffect(()=>{
    if(selectedAccount){
      setMetadataColl({
        ...metadataColl,
        project_treasury: selectedAccount?.address,
        launchpad_treasury: selectedAccount?.address
      })
    }
  },[selectedAccount])

  return (
    <>
      <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
              Launch Collection
            </h2>
          </div>
        </div>

        <div className="mb-8 flex">
          <ol className="w-full items-center justify-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
            {stepMenu.map((item) => {
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex items-center space-x-2.5",
                    step >= item.id
                      ? "text-green-600 dark:text-green-500"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  <span className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                    step >= item.id
                      ? "border-green-600 dark:border-green-500"
                      : "border-gray-500 dark:border-gray-400"
                  )}>
                    {item.id < step ? <CheckmarkIcon /> : item.id }
                  </span>
                  <span>
                    <h3 className="font-medium leading-tight">{item.name}</h3>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {step === 1 && <FormCollection metadataColl={metadataColl} setMetadataColl={setMetadataColl} />}
        {step === 2 && <UploadAsset metadataColl={metadataColl} setMetadataColl={setMetadataColl} />}
        {step === 3 && <DeployNFT metadataColl={metadataColl} setMetadataColl={setMetadataColl} />}

        {step > 1 && (
          <Button shape="rounded" className="mr-2" onClick={handleBack}>
            BACK
          </Button>
        )}
        <Button shape="rounded" onClick={handleNext}>
          NEXT
        </Button>
      </div>
    </>
  );
}
