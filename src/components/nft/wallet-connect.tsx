'use client';

// import { useWeb3Modal } from '@web3modal/react';
// import { useAccount, useBalance, useDisconnect } from 'wagmi';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { OpenSelectAccount, OpenSelectWallet, WalletContext } from '@/contexts/index';
import { useContext } from 'react';
import { useModal } from '../modal-views/context';
import { prettyTruncate } from '@/utils/common';

export default function WalletConnect({
  btnClassName,
  anchorClassName,
}: {
  btnClassName?: string;
  anchorClassName?: string;
}) {
  // TODO: Account selection
  // TODO: Balance fetching for selected chains
  // TODO: Select chains

  const walletContext = useContext(WalletContext);
  const accountContext = useContext(OpenSelectAccount)
  const firstAccount = walletContext.accounts?.[0];
  const selectWallet = useContext(OpenSelectWallet);
  const disconnect = () => { selectWallet.open() };

  return (
    <>
      {firstAccount ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <Menu>
              <Menu.Button className="flex items-center overflow-hidden rounded-full shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large bg-white dark:bg-gray-900 dark:hover:bg-gray-800 py-2 px-3 space-x-2">
                <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-10 w-10 rounded-full'></div>
                <div className='flex flex-col items-start'>
                  <p className='text-gray-900 dark:text-white font-semibold'>{walletContext.selectedAccount.name}</p>
                  <p className='text-gray-600 dark:text-gray-400 text-xs'>{prettyTruncate(walletContext.selectedAccount.address, 12, 'address')}</p>
                </div>
              </Menu.Button>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <ActiveLink
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        <span className="grow uppercase">
                          View Your Profile
                        </span>
                        <ChevronForward />
                      </ActiveLink>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Item>
                      <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                        <div className="flex items-center justify-between gap-3 my-1">
                          <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                            Name
                          </span>
                          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                            {walletContext.selectedAccount?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                            Address
                          </span>
                          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                            {prettyTruncate(walletContext.selectedAccount?.address, 15, 'address')}
                            {/* {firstAccount.address.slice(0, 6)}
                            {'...'}
                            {firstAccount.address.slice(firstAccount.address.length - 6)} */}
                          </span>
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={() => accountContext.open()}
                      >
                        <span className="grow uppercase">
                          Change Account
                        </span>
                        <ChevronForward />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={() => disconnect()}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <ActiveLink href="/create-nft" className={cn(anchorClassName)}>
            <Button
              className={cn('shadow-main hover:shadow-large', btnClassName)}
            >
              CREATE
            </Button>
          </ActiveLink>
        </div >
      ) : (
        <Button
          onClick={() => selectWallet.open()}
          className={cn('shadow-main hover:shadow-large', btnClassName)}
        >
          CONNECT
        </Button>
      )
      }
    </>
  );
}
