'use client';

import { useContext, useState } from 'react';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import { authorData } from '@/data/static/author';
import ProfileTab from '@/components/profile/profile-tab';
import { WalletContext } from '@/contexts';
import { prettyTruncate } from '@/utils/common';

export default function Profile() {
  const {selectedAccount} = useContext(WalletContext)
  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex flex-col items-center justify-center">
        <Avatar
          size="xl"
          image={authorData?.avatar?.thumbnail}
          alt="Author"
          className="mx-auto dark:border-gray-500"
        />
        <h2 className="mt-5 text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
          {prettyTruncate(selectedAccount?.name, 30, 'address')}
        </h2>
        <p className="mt-5 text-sm font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
          {prettyTruncate(selectedAccount?.address, 30, 'address')}
        </p>
        <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
          <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 3xl:ltr:pl-14 3xl:rtl:pr-14">
            <ProfileTab />
          </div>
        </div>
      </div>
    </div>
  );
}
