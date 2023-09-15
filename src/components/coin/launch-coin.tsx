'use client';

import { useState } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';

export default function LaunchCoin() {
  const [publish, setPublish] = useState(true);

  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
            Launch Coin
          </h2>
        </div>
      </div>
      <div className="mb-8">
        <InputLabel title="Name" important />
        <Input type="text" placeholder="Bitcoin" />
      </div>
      <div className="mb-8">
        <InputLabel title="Total Supply" important />
        <Input
          min={0}
          type="number"
          placeholder="Enter your total supply"
          inputClassName="spin-button-hidden"
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Symbol" important />
        <Input type="text" placeholder="BTC" />
      </div>
      <div className="mb-8">
        <InputLabel title="Decimal" important />
        <Input
          min={0}
          type="number"
          placeholder="Enter decimal"
          inputClassName="spin-button-hidden"
        />
      </div>
      <div className="mb-8 grid grid-cols-4 gap-5">
        <div>
          <InputLabel title="Burnable" important />
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
        </div>
        <div>
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
        </div>
        <div>
          <InputLabel title="Mintable" important />
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
        </div>
        <div>
          <InputLabel title="Pausable" important />
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
        </div>
      </div>

      <Button shape="rounded">SUBMIT</Button>
    </div>
  );
}
