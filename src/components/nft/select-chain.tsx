import { useEffect, useState } from 'react';
import { Listbox } from '@/components/ui/listbox';
import { ChevronDown } from '@/components/icons/chevron-down';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { Transition } from '@/components/ui/transition';
import {
  useInkathon,
  allSubstrateChains,
  SubstrateChain,
} from '@scio-labs/use-inkathon';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function SelectChain() {
  const [selectedChain, setSelectedChain] = useState<SubstrateChain>(
    allSubstrateChains[0]
  );
  const [chain, setChain] = useLocalStorage('chain');
  const { switchActiveChain, isConnected, activeChain } = useInkathon();

  const anyOnLocal = async () => {
    if (chain) {
      isConnected && (await switchActiveChain?.(JSON.parse(chain)));
      setSelectedChain(JSON.parse(chain));
    }
  };

  useEffect(() => {
    anyOnLocal();
  }, [chain]);

  useEffect(() => {
    if (activeChain) {
      const selected: any = allSubstrateChains.find(
        (chain) => chain.network === activeChain.network
      );
      setSelectedChain(selected);
    }
  }, [activeChain]);
  return (
    <div className="relative w-60">
      <Listbox
        value={selectedChain}
        onChange={async (value) => {
          setSelectedChain(value);
          isConnected && (await switchActiveChain?.(value));
          setChain(JSON.stringify(value));
        }}
      >
        <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
          <div className="flex items-center">{selectedChain.name}</div>
          <ChevronDown />
        </Listbox.Button>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute left-0 z-10 mt-1 grid max-h-[300px] w-full origin-top-right gap-0.5 overflow-auto rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
            <Listbox.Label className="my-2 text-xs uppercase text-gray-500 dark:text-gray-500">
              Live Network
            </Listbox.Label>
            {allSubstrateChains
              .filter((chain) => !chain.testnet)
              .map((option) => {
                return (
                  <Listbox.Option key={option.ss58Prefix} value={option}>
                    <div
                      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                        selectedChain.name === option.name
                          ? 'bg-gray-100 dark:bg-gray-700/70'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                      }`}
                    >
                      {option.name}
                      {selectedChain.name === option.name ? (
                        <CheckmarkIcon className="h-5 w-5" aria-hidden="true" />
                      ) : null}
                    </div>
                  </Listbox.Option>
                );
              })}
            <Listbox.Label className="my-2 text-xs uppercase text-gray-500 dark:text-gray-500">
              Test Network
            </Listbox.Label>
            {allSubstrateChains
              .filter((chain) => chain.testnet)
              .map((option) => {
                return (
                  <Listbox.Option key={option.ss58Prefix} value={option}>
                    <div
                      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                        selectedChain.name === option.name
                          ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                      }`}
                    >
                      {option.name}
                      {selectedChain.name === option.name ? (
                        <CheckmarkIcon className="h-5 w-5" aria-hidden="true" />
                      ) : null}
                    </div>
                  </Listbox.Option>
                );
              })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
