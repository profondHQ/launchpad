import { useState } from 'react';
import { Listbox } from '@/components/ui/listbox';
import { ChevronDown } from '@/components/icons/chevron-down';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import { Transition } from '@/components/ui/transition';

export default function SelectChain() {
  const chainOptions = [
    {
      id: 1,
      name: 'Ethereum1',
      value: 'ethereum1',
      type: 'test',
    },
    {
      id: 2,
      name: 'Flow2',
      value: 'flow2',
      type: 'test',
    },
    {
      id: 3,
      name: 'Ethereum3',
      value: 'ethereum3',
      type: 'live',
    },
    {
      id: 4,
      name: 'Ethereum4',
      value: 'ethereum4',
      type: 'live',
    },
    {
      id: 5,
      name: 'Flow5',
      value: 'flow5',
      type: 'test',
    },
    {
      id: 6,
      name: 'Astar6',
      value: 'astar6',
      type: 'test',
    },
  ];

  const [selected, setSelected] = useState(chainOptions[0]);
  return (
    <div className="relative w-60">
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
          <div className="flex items-center">{selected.name}</div>
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
            {chainOptions.map((option) => {
              if (option.type == 'live') {
                return (
                  <Listbox.Option key={option.id} value={option}>
                    {({ selected }) => (
                      <div
                        className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                          selected
                            ? 'bg-gray-100 dark:bg-gray-700/70'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                        }`}
                      >
                        {option.name}
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckmarkIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Listbox.Option>
                );
              }
            })}
            <Listbox.Label className="my-2 text-xs uppercase text-gray-500 dark:text-gray-500">
              Test Network
            </Listbox.Label>
            {chainOptions.map((option) => {
              if (option.type == 'test') {
                return (
                  <Listbox.Option key={option.id} value={option}>
                    {({ selected }) => (
                      <div
                        className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                          selected
                            ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                        }`}
                      >
                        {option.name}
                      </div>
                    )}
                  </Listbox.Option>
                );
              }
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
