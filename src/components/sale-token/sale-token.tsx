'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import axios from 'axios';
import { Listbox } from '@/components/ui/listbox';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Transition } from '@/components/ui/transition';
import InputLabel from '@/components/ui/input-label';
import { Check } from '../icons/check';
import {
  useInkathon,
  contractQuery,
  contractTx,
  decodeOutput,
} from '@scio-labs/use-inkathon';
import CheckSuccess from '@/assets/images/check-success.svg';
import Image from '@/components/ui/image';
import Alert from '@/components/ui/alert';
import { API_URL } from '@/config/common';
import { getSs58Address } from '@/utils/common';
import metadata_psp22 from '@/config/metadata/psp22';
import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { BN } from '@polkadot/util';

// check if token has been

export default function SaleToken() {
  const [listToken, setListToken] = useState<any | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<any | null>(null);
  const [isCoinInitiated, setIsCoinInitiated] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { api, activeAccount, activeChain } = useInkathon();
  const [payloadSale, setPayloadSale] = useState({
    sale_rate: 0,
    max_supply: 0,
    sale_start_at: '',
    sale_end_at: '',
  });

  const getMyCoins = async () => {
    const res = await axios.get(API_URL + '/coins', {
      params: {
        minter_address: getSs58Address(
          activeChain?.ss58Prefix || 0,
          activeAccount?.address
        ),
      },
    });
    setListToken(res.data);
    onSelectedCoin(res.data[0]);
  };

  const fetchSaleOptions = async (contractAddress: string) => {
    const contract = new ContractPromise(
      api as ApiPromise,
      metadata_psp22,
      contractAddress
    );
    const result = await contractQuery(
      api as ApiPromise,
      contractAddress,
      contract,
      'get_max_supply'
    );
    const { output } = decodeOutput(result, contract, 'get_max_supply');
    if (output?.Ok) {
      setIsCoinInitiated(true);
    } else {
      setIsCoinInitiated(false);
    }
  };

  const setSaleOptions = async (
    contractAddress: string,
    decimals: number,
    salePrice: number,
    maxSupply: number,
    startAt: string,
    endAt: string
  ) => {
    setLoading(true);
    const startAtTimestamp = new Date(startAt).getTime();
    const endAtTimestamp = new Date(endAt).getTime();
    const maxSupplyFinal = (new BN(maxSupply)).mul(new BN(10).pow(new BN(decimals))).toString();
    // All native chain use 18 decimals
    // * 10000 to support fraction
    // amount = native_amount * sale_rate
    // sale_price = native_amount / amount
    // sale_rate = amount / native_amount
    const saleRate = 1 / salePrice;
    const contract = new ContractPromise(
      api as ApiPromise,
      metadata_psp22,
      contractAddress
    );

    try {
      await contractTx(
        api as ApiPromise,
        activeAccount?.address as string,
        contract,
        'set_sale_options',
        {},
        [saleRate, maxSupplyFinal, startAtTimestamp, endAtTimestamp],
        async (result: any) => {
          if (result.status.isInBlock || result.status.isFinalized) {
            console.log(result);
            setLoading(false);
            setSubmitted(true);
            setIsCoinInitiated(true);
            setTimeout(() => {
              setSubmitted(false);
            }, 6000);
          }
        }
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeAccount?.address) {
      getMyCoins();
    }
  }, [activeAccount?.address]);

  const onInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setPayloadSale({
      ...payloadSale,
      [type]: e.target.value,
    });
  };

  const onSubmit = async () => {
    setSaleOptions(
      selectedCoin.contract_address,
      selectedCoin.decimals,
      payloadSale.sale_rate,
      payloadSale.max_supply,
      payloadSale.sale_start_at,
      payloadSale.sale_end_at
    );
  };

  const onSelectedCoin = async (coin: any) => {
    setSelectedCoin(coin);
    await fetchSaleOptions(coin.contract_address);
  };

  if (!activeAccount?.address) {
    return (
      <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
              Sale Token
            </h2>
          </div>
          <Button isLoading={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
            Sale Token
          </h2>
        </div>
      </div>
      {submitted && (
        <div className="mb-8">
          <Alert>
            <div className="flex flex-row items-center">
              <Image src={CheckSuccess} alt="success" width={20} height={20} />
              <h4 className="ms-5 text-sm font-medium uppercase tracking-wider dark:text-green-500">
                Success Setting Sale Token
              </h4>
            </div>
          </Alert>
        </div>
      )}
      <div className="mb-8">
        <InputLabel title="Token" important />
        <div className="relative">
          <Listbox value={selectedCoin} onChange={onSelectedCoin}>
            <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
              <div className="flex items-center">
                {selectedCoin?.name} - {selectedCoin?.contract_address}
              </div>
              <ChevronDown />
            </Listbox.Button>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 z-10 mt-1 grid max-h-[300px] w-full origin-top-right gap-0.5 overflow-auto rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                {listToken?.map((option: any) => {
                  return (
                    <Listbox.Option
                      key={option.contract_address}
                      value={option}
                    >
                      {({ selected }) => (
                        <div
                          className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                            selected
                              ? 'bg-gray-100 dark:bg-gray-700/70'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                          }`}
                        >
                          {option?.name} - {option?.contract_address} (
                          {option?.chain})
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
      {selectedCoin && (
        <div className="mb-8">
          <InputLabel title="Chain" />
          <Input disabled={true} value={selectedCoin.chain} />
        </div>
      )}
      <div className="mb-8">
        <InputLabel title="Max Supply" important />
        <Input
          error={isCoinInitiated ? 'Coin sale has been set' : undefined}
          disabled={isCoinInitiated}
          min={0}
          type="number"
          placeholder="Enter your max supply"
          inputClassName="spin-button-hidden"
          onChange={(e) => onInput(e, 'max_supply')}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Sale Rate" important />
        <Input
          error={isCoinInitiated ? 'Coin sale has been set' : undefined}
          disabled={isCoinInitiated}
          min={0}
          type="number"
          placeholder={`Enter your sale rate in ${
            selectedCoin ? selectedCoin?.chain : 'Native Currency'
          }`}
          inputClassName="spin-button-hidden"
          onChange={(e) => onInput(e, 'sale_rate')}
        />
      </div>
      <div className="mb-8 grid grid-cols-2 gap-5">
        <div>
          <InputLabel title="Start Date" important />
          <Input
            error={isCoinInitiated ? 'Coin sale has been set' : undefined}
            disabled={isCoinInitiated}
            type="date"
            onChange={(e) => onInput(e, 'sale_start_at')}
          />
        </div>
        <div>
          <InputLabel title="End Date" important />
          <Input
            error={isCoinInitiated ? 'Coin sale has been set' : undefined}
            disabled={isCoinInitiated}
            type="date"
            onChange={(e) => onInput(e, 'sale_end_at')}
          />
        </div>
      </div>
      <Button
        disabled={isCoinInitiated}
        shape="rounded"
        onClick={onSubmit}
        isLoading={loading}
      >
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
