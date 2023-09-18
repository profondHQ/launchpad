import { StaticImageData } from 'next/image';

type CardProps = {
  id?: string | number;
  name: string;
  logo?: StaticImageData;
  balance?: string;
  coinType?: string;
  supply?: string;
  symbol?: string;
};

export default function CoinList({ name, supply, symbol }: CardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-3 text-sm font-medium tracking-wider shadow-card dark:bg-light-dark sm:p-4">
      <div>
        <div className="ltr:ml-2 rtl:mr-2 mb-2">{name}</div>
        <p className='text-sm text-gray-600 ltr:ml-2 rtl:mr-2'>{symbol}</p>
      </div>
      <div className="overflow-hidden text-ellipsis -tracking-wider ltr:pl-2 rtl:pr-2">
        Total supply: {supply}
      </div>
    </div>
  );
}
