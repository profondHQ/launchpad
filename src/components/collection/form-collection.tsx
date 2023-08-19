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

//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import PriceType from '@/components/create-nft/price-types-props';

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

export default function FormCollection() {
  let [publish, setPublish] = useState(true);
  let [explicit, setExplicit] = useState(false);
  let [unlocked, setUnlocked] = useState(false);
  let [priceType, setPriceType] = useState('fixed');
  let [blockchain, setBlockChain] = useState(BlockchainOptions[0]);
  return (
    <>
      <div className="mb-8">
        <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-xl">
          Collection
        </h4>
      </div>

      <div className="mb-8">
        <InputLabel title="Contract Name" important />
        <Input type="text" placeholder="MyNFTs" />
      </div>
      <div className="mb-8">
        <InputLabel title="Collection Name" important />
        <Input type="text" placeholder="My NFTs" />
      </div>
      <div className="mb-8">
        <InputLabel title="Symbol" important />
        <Input type="text" placeholder="MNFT" />
      </div>
      <div className="mb-8 grid grid-cols-2 gap-5">
        <div>
          <InputLabel title="Launch Date" important />
          <Input type="date" placeholder="MNFT" />
        </div>
        <div>
          <InputLabel title="End Date" important />
          <Input type="date" placeholder="MNFT" />
        </div>
      </div>

      <div className="my-10">
        <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-xl">
          NFTs
        </h4>
      </div>

      {/* Name */}
      <div className="mb-8">
        <InputLabel 
          title="Base art name" 
          subTitle="The base name of your NFT eg. 'Crypto Car #' which will name your NFTs 'Crypto Car #1', 'Crypto Car #2', 'Crypto Car #3' etc."
          important 
          />
        <Input type="text" placeholder="NFT #" />
      </div>

      {/* Description */}
      <div className="mb-8">
        <InputLabel
          title="Description"
          subTitle="The description of you individual NFTs, use the '{name}' variable in the description to add the NFTs name dynamically in the description."
          important
        />
        <Textarea placeholder="{name} - Generated and deployed on LaunchMyNFT." />
      </div>

      {/* Blockchain */}
      <div className="mb-8">
        <InputLabel title="Blockchain" />
        <div className="relative">
          <Listbox value={blockchain} onChange={setBlockChain}>
            <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
              <div className="flex items-center">
                <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>
                {blockchain.name}
              </div>
              <ChevronDown />
            </Listbox.Button>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                {BlockchainOptions.map((option) => (
                  <Listbox.Option key={option.id} value={option}>
                    {({ selected }) => (
                      <div
                        className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                          selected
                            ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                        }`}
                      >
                        <span className="ltr:mr-2 rtl:ml-2">
                          {option.icon}
                        </span>
                        {option.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
    </>
  );
}