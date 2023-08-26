'use client';

import { Fragment, useRef, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import Button from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { Close } from '@/components/icons/close';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import Image from '@/components/ui/image';
import ListCard from '@/components/ui/list-card';

export const atributes = [
  {
    id: 1,
    name: 'Background',
    value: 'Black',
  },
  {
    id: 2,
    name: 'Left Eye',
    value: 'X Orange',
  },
  {
    id: 3,
    name: 'Face',
    value: 'Round Aqua',
  },
  {
    id: 1,
    name: 'Background',
    value: 'Black',
  },
  {
    id: 2,
    name: 'Left Eye',
    value: 'X Orange',
  },
  {
    id: 1,
    name: 'Background',
    value: 'Black',
  },
  {
    id: 2,
    name: 'Left Eye',
    value: 'X Orange',
  },
  {
    id: 3,
    name: 'Face',
    value: 'Round Aqua',
  },
  {
    id: 1,
    name: 'Background',
    value: 'Black',
  },
  {
    id: 2,
    name: 'Left Eye',
    value: 'X Orange',
  },
];

export default function ModalDetail() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
              <div className="relative block">
                <Image
                  src={NFT1}
                  width={500}
                  alt="Pulses of Imagination #214"
                />
              </div>
              <div className="w-auto p-5 xs:w-[600px]">
                <h2 className="my-5 text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  Flow Punk Gallery #303
                </h2>
                <div className="mb-5 block">
                  <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                    Description
                  </h3>
                  <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                    NFT #1 - Generated and deployed on LaunchMyNFT.
                  </div>
                </div>
                <div className="block">
                  <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                    Attributes
                  </h3>
                  <div className="grid h-[200px] grid-cols-1 gap-3 overflow-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4">
                    {atributes?.map((wallet) => (
                      <ListCard
                        item={wallet}
                        key={`wallet-key-${wallet?.id}`}
                        variant="large"
                      />
                    ))}
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
