'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config/common';
import ModalDetail from './modal-detail';
import { BN } from '@polkadot/util';
import Loader from '@/components/ui/loader';

export default function MinimalScreen() {
  const [myCoins, setMyCoins] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMyCoins();
  }, []);

  const getMyCoins = async () => {
    setIsLoading(true);
    const res = await axios.get(API_URL + '/coins?is_on_sale=true', {});
    setMyCoins(res.data);
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
        <div className="flex flex-col justify-center">
          <h2 className="mb-10 text-center text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
            The home of NFT and Token creation
          </h2>
          <h2 className="mb-5 text-left text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
            Current Sales
          </h2>
          {isLoading && (
            <div className="flex h-[100px] max-w-full flex-col items-center justify-center text-center ">
              <div className="relative max-w-full">
                <Loader size="large" variant="scaleUp" />
              </div>
            </div>
          )}
          {!isLoading && myCoins === null && (
            <div className="flex h-[100px] max-w-full flex-col">
              <div className="relative max-w-full">
                <h4 className="mb-5 text-left text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                  Sales is Empty
                </h4>
              </div>
            </div>
          )}
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {myCoins?.map((coin: any) => (
              <CoinList
                key={`coin-${coin?.contract_address}`}
                name={coin.name}
                symbol={coin.symbol}
                maxSupply={coin.max_supply.$numberDecimal || coin.max_supply}
                boughtSupply={coin.bought_supply.$numberDecimal || coin.bought_supply}
                decimals={coin.decimals}
                onClick={() => {
                  setModalOpen(true);
                  setSelectedCoin(coin);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalDetail
        show={modalOpen}
        handleClose={() => setModalOpen(false)}
        data={selectedCoin}
      />
    </div>
  );
}

export function CoinList({
  name,
  maxSupply,
  boughtSupply,
  symbol,
  decimals,
  onClick,
}: {
  name?: string;
  maxSupply?: string;
  boughtSupply?: string;
  symbol?: string;
  decimals?: number;
  onClick: any;
}) {
  const formattedMaxSupply = new BN(maxSupply as string)
    .div(new BN(10).pow(new BN(decimals as number)))
    .toString();
  const formattedBoughtSupply = new BN(boughtSupply as string)
    .div(new BN(10).pow(new BN(decimals as number)))
    .toString();
  return (
    <div
      onClick={() => onClick()}
      className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3 text-sm font-medium tracking-wider shadow-card hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:bg-light-dark sm:p-4"
    >
      <div>
        <div className="mb-2 ltr:ml-2 rtl:mr-2">{name}</div>
        <p className="text-sm text-gray-600 ltr:ml-2 rtl:mr-2">{symbol}</p>
      </div>
      <div className="overflow-hidden text-ellipsis -tracking-wider ltr:pl-2 rtl:pr-2">
        Supply: {formattedBoughtSupply}/{formattedMaxSupply}
      </div>
    </div>
  );
}
