import { StaticImageData } from 'next/image';

type CardProps = {
  id?: string | number;
  name: string;
  logo?: StaticImageData;
  balance?: string;
  coinType?: string;
  supply?: string;
};

export default function CoinList({ name, supply }: CardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-3 text-sm font-medium tracking-wider shadow-card dark:bg-light-dark sm:p-4">
      <div className="flex items-center">
        <div className="ltr:ml-2 rtl:mr-2">{name}</div>
      </div>
      <div className="overflow-hidden text-ellipsis -tracking-wider ltr:pl-2 rtl:pr-2">
        {supply}
      </div>
    </div>
  );
}
