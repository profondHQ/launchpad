'use client';

import { Fragment, useRef, useState, ChangeEvent, useContext } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import Button from '@/components/ui/button';
import { Close } from '@/components/icons/close';
import useCountdown from '@/hooks/useCountdown';
import Input from '@/components/ui/forms/input';
import { Check } from '../icons/check';
import { useInkathon } from '@scio-labs/use-inkathon';
import { OpenSelectWallet } from '@/contexts/index';
import { BN } from '@polkadot/util';

type ModalsProps = {
  show: boolean;
  handleClose: () => void;
  data: any;
};

const chainCoinSymbols: any = {
  shibuya: 'SBY',
  astar: 'ASTR',
  shiden: 'SDN',
  alephzerotestnet: 'TZERO',
  alephzero: 'AZERO',
};

export default function ModalDetail({ show, handleClose, data }: ModalsProps) {
  const initialPayload = {
    amount: 0,
  };

  const walletContext = useContext(OpenSelectWallet);
  const cancelButtonRef = useRef(null);
  const { seconds, minutes, hours, days, isRunning } = useCountdown({
    time: data?.start_at,
  });
  const {
    seconds: endSeconds,
    minutes: endMinutes,
    hours: endHours,
    days: endDays,
    isRunning: endIsRunning,
  } = useCountdown({
    time: data?.end_at,
  });
  const { isConnected } = useInkathon();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [payload, setPayload] = useState(initialPayload);

  const closeModal = () => {
    handleClose();
    setPayload(initialPayload);
    setSubmitted(false);
    setLoading(false);
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setPayload({
      ...payload,
      [type]: e.target.value,
    });
  };

  const onSubmit = async () => {
    console.log('payload ', payload);
    setSubmitted(true);
  };

  const formattedMaxSupply = new BN(data?.max_supply.$numberDecimal as string)
    .div(new BN(10).pow(new BN(data?.decimals as number)))
    .toString();
  const formattedBoughtSupply = new BN(
    data?.bought_supply.$numberDecimal as string
  )
    .div(new BN(10).pow(new BN(data?.decimals as number)))
    .toString();

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
        </Transition.Child>

        <span className="inline-block h-full align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* This element is need to fix FocusTap headless-ui warning issue */}
        <div className="sr-only">
          <Button
            size="small"
            color="gray"
            shape="circle"
            onClick={closeModal}
            className="opacity-50 hover:opacity-80 "
          >
            <Close className="h-auto w-[13px]" />
          </Button>
        </div>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105"
        >
          <div className="relative z-50 inline-block w-full text-left align-middle xs:w-auto">
            {/* Content goes here */}
            <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-dark xs:flex-row">
              <div className="w-auto p-5 xs:w-[1000px]">
                <h1 className="mb-10 mt-5 text-center text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  Buy Token
                </h1>
                <div className="mb-8 grid grid-cols-2 gap-5">
                  <div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Coin
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {data?.name} ( {data?.symbol} )
                      </div>
                    </div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Supply
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {formattedBoughtSupply}/{formattedMaxSupply}
                      </div>
                    </div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Chain
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {data?.chain}
                      </div>
                    </div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Decimal
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {data?.decimals}
                      </div>
                    </div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Contract Address
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {data?.contract_address}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        {isRunning ? 'Sale Starts In' : 'Sale Ends In'}
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {isRunning ? (
                          <div className="mt-4">
                            Starts in: {days}D {hours}H {minutes}M {seconds}S
                          </div>
                        ) : (
                          <div className="mt-4">
                            Ends in: {endDays}D {endHours}H {endMinutes}M{' '}
                            {endSeconds}S
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-5 block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Status
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {isRunning ? 'Upcoming' : 'In Progress'}
                      </div>
                    </div>
                    <div className="mb-5">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Amount
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        <Input
                          min={0}
                          type="number"
                          placeholder="Enter your amount to buy"
                          inputClassName="spin-button-hidden"
                          onChange={(e) => onInput(e, 'amount')}
                        />
                      </div>
                      <div className="mt-4">
                        Total: {payload.amount} {data?.symbol}
                      </div>
                      <div className="mt-4">
                        Price:{' '}
                        {new BN(payload.amount)
                          .mul(new BN(data?.sale_price.$numberDecimal))
                          .div(new BN(10).pow(new BN(14)))
                          .toNumber() / 10000}{' '}
                        {chainCoinSymbols[data?.chain]}
                      </div>
                      {isConnected ? (
                        <Button
                          shape="rounded"
                          className="mt-5"
                          onClick={onSubmit}
                          isLoading={loading}
                          size="small"
                        >
                          {submitted ? (
                            <span className="flex items-center">
                              <Check color="green" className="mr-2 inline" />{' '}
                              Success Buy
                            </span>
                          ) : (
                            `BUY`
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => walletContext.open()}
                          shape="rounded"
                          className="mt-5"
                        >
                          Connect Wallet
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
