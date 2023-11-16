'use client';

import { ChangeEvent, useContext, useState } from 'react';
import { WsProvider, ApiPromise } from '@polkadot/api';
import { BlueprintPromise } from '@polkadot/api-contract';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import { RPC } from '@/config/common';
import metadata_psp22 from '@/config/metadata/psp22';
import { coinConfig } from '@/config/coin';
import { Check } from '../icons/check';
import { WalletContext } from '@/contexts';
import { BN, stringCamelCase, bnToBn } from '@polkadot/util';
import type { WeightV2 } from '@polkadot/types/interfaces';
import { getMaxGasLimit } from '@/utils/common';
import { useInkathon } from '@scio-labs/use-inkathon';
import CheckSuccess from '@/assets/images/check-success.svg';
import Image from '@/components/ui/image';
import Alert from '@/components/ui/alert';

export default function LaunchCoin() {
  // const {selectedAccount, wallet} = useContext(WalletContext)
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { activeSigner, activeAccount } = useInkathon();
  const [metadataCoin, setMetadataCoin] = useState({
    total_supply: 0,
    name: '',
    symbol: '',
    decimals: 0,
    is_pausable: false,
    is_mintable: false,
    is_burnable: false,
    is_sale: true,
  });

  const onInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setMetadataCoin({
      ...metadataCoin,
      [type]: e.target.value,
    });
  };

  const onSwitch = (checked: boolean, type: string) => {
    setMetadataCoin({
      ...metadataCoin,
      [type]: checked ? true : false,
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const totalSupply = new BN(metadataCoin.total_supply).mul(
        new BN((10 ** metadataCoin.decimals).toString())
      );
      const wsProvider = new WsProvider(RPC);
      const api = await ApiPromise.create({ provider: wsProvider });
      const signer = activeSigner;
      api.setSigner(signer);
      const bluerprint = new BlueprintPromise(
        api,
        metadata_psp22,
        coinConfig.code_hash
      );
      const tx = bluerprint.tx[stringCamelCase('new')](
        {
          gasLimit: api.registry.createType(
            'WeightV2',
            getMaxGasLimit(api)
          ) as any,
          storageDepositLimit: null,
          value: 0,
        },
        ...(metadataCoin && [
          totalSupply,
          metadataCoin.name,
          metadataCoin.symbol,
          metadataCoin.decimals,
          metadataCoin.is_pausable,
          metadataCoin.is_mintable,
          metadataCoin.is_burnable,
          metadataCoin.is_sale
        ])
      );
      await tx.signAndSend(
        activeAccount?.address as string,
        async (result: any) => {
          if (result.status.isInBlock || result.status.isFinalized) {
            console.log(result);
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false);
            }, 6000);
          }
        }
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
            Launch Coin
          </h2>
        </div>
      </div>
      {submitted && (
        <div className="mb-8">
          <Alert>
            <div className="flex flex-row items-center">
              <Image src={CheckSuccess} alt="success" width={20} height={20} />
              <h4 className="ms-5 text-sm font-medium uppercase tracking-wider dark:text-green-500">
                Success Submit Coin
              </h4>
            </div>
          </Alert>
        </div>
      )}
      <div className="mb-8">
        <InputLabel title="Name" important />
        <Input
          type="text"
          placeholder="Bitcoin"
          onChange={(e) => onInput(e, 'name')}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Total Supply" important />
        <Input
          min={0}
          type="number"
          placeholder="Enter your total supply"
          inputClassName="spin-button-hidden"
          onChange={(e) => onInput(e, 'total_supply')}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Symbol" important />
        <Input
          type="text"
          placeholder="BTC"
          onChange={(e) => onInput(e, 'symbol')}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Decimal" important />
        <Input
          min={0}
          type="number"
          placeholder="Enter decimal"
          inputClassName="spin-button-hidden"
          onChange={(e) => onInput(e, 'decimal')}
        />
      </div>
      <div className="mb-8 grid grid-cols-4 gap-5">
        <div>
          <InputLabel title="Burnable" important />
          <div className="shrink-0">
            <Switch
              checked={metadataCoin.is_burnable}
              onChange={(e) => onSwitch(e, 'is_burnable')}
            >
              <div
                className={cn(
                  metadataCoin.is_burnable
                    ? 'bg-brand'
                    : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    metadataCoin.is_burnable
                      ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                    'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                  )}
                />
              </div>
            </Switch>
          </div>
        </div>
        {/* <div>
          <InputLabel title="Flashmint" important />
          <div className="shrink-0">
            <Switch checked={publish} onChange={() => setPublish(!publish)}>
              <div
                className={cn(
                  publish ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    publish
                      ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                    'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                  )}
                />
              </div>
            </Switch>
          </div>
        </div> */}
        <div>
          <InputLabel title="Mintable" important />
          <div className="shrink-0">
            <Switch
              checked={metadataCoin.is_mintable}
              onChange={(e) => onSwitch(e, 'is_mintable')}
            >
              <div
                className={cn(
                  metadataCoin.is_mintable
                    ? 'bg-brand'
                    : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    metadataCoin.is_mintable
                      ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                    'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                  )}
                />
              </div>
            </Switch>
          </div>
        </div>
        <div>
          <InputLabel title="Pausable" important />
          <div className="shrink-0">
            <Switch
              checked={metadataCoin.is_pausable}
              onChange={(e) => onSwitch(e, 'is_pausable')}
            >
              <div
                className={cn(
                  metadataCoin.is_pausable
                    ? 'bg-brand'
                    : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    metadataCoin.is_pausable
                      ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                    'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                  )}
                />
              </div>
            </Switch>
          </div>
        </div>
      </div>

      <Button shape="rounded" onClick={onSubmit} isLoading={loading}>
        {submitted ? (
          <span className="flex items-center">
            <Check color="green" className="mr-2 inline" /> Submitted
          </span>
        ) : (
          `SUBMIT`
        )}
      </Button>
    </div>
  );
}
