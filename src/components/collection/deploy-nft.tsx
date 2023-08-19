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

export default function DeployNFT() {
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
        <div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium tracking-wider text-gray-900 dark:text-white sm:text-sm">
              Deploy NFT

              <CheckmarkIcon />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
