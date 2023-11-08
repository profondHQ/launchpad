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
import { useInkathon } from '@scio-labs/use-inkathon';
import CheckSuccess from '@/assets/images/check-success.svg';
import Image from '@/components/ui/image';
import Alert from '@/components/ui/alert';
import { API_URL } from '@/config/common';
import { getSs58Address } from '@/utils/common';

export default function SaleToken() {
  const [listToken, setListToken] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { activeAccount, activeChain } = useInkathon();
  const [payloadSale, setPayloadSale] = useState({
    sale_rate: 0,
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
  };

  useEffect(() => {
    if (activeAccount) {
      getMyCoins();
    }
  }, [activeAccount]);

  const onInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setPayloadSale({
      ...payloadSale,
      [type]: e.target.value,
    });
  };

  const onSubmit = async () => {
    console.log(payloadSale);
  };

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
                Success Sale Token
              </h4>
            </div>
          </Alert>
        </div>
      )}
      <div className="mb-8">
        <InputLabel title="Token" important />
        <div className="relative">
          <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
              <div className="flex items-center">
                {selected?.name} - {selected?.contract_address}
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
                          {option?.name} - {option?.contract_address}
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
      <div className="mb-8">
        <InputLabel title="Sale Rate" important />
        <Input
          min={0}
          type="number"
          placeholder="Enter your sale rate"
          inputClassName="spin-button-hidden"
          onChange={(e) => onInput(e, 'sale_rate')}
        />
      </div>
      <div className="mb-8 grid grid-cols-2 gap-5">
        <div>
          <InputLabel title="Start Date" important />
          <Input type="date" onChange={(e) => onInput(e, 'sale_start_at')} />
        </div>
        <div>
          <InputLabel title="End Date" important />
          <Input type="date" onChange={(e) => onInput(e, 'sale_end_at')} />
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
