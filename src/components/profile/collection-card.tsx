import Image from '@/components/ui/image';
import cn from 'classnames';
import { StaticImageData } from 'next/image';
import Avatar from '@/components/ui/avatar';
import { useLayout } from '@/lib/hooks/use-layout';
import { AlephZero } from '../icons/aleph-zero';
import useCountdown from '@/hooks/useCountdown';

type ItemType = {
  id?: string | number;
  title: string;
  cover_image: StaticImageData;
  name?:string;
  total_supply?: number
  max_supply?: number
  price_per_mint?:number
  description: string;
  public_sale_start_at?: number
  public_sale_end_at?: number
  chain: {
    image?: StaticImageData;
    name: string;
  };
  symbol: string
};
type CardProps = {
  item: ItemType;
  className?: string;
};

export default function CollectionCard({ item, className = '' }: CardProps) {
  const { title, cover_image, description, chain } = item ?? {};
  const { layout } = useLayout();
  const { seconds, minutes, hours, days, isRunning } = useCountdown({
		time: item.public_sale_end_at
	})
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
        className
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        {
          cover_image &&
        <Image
        src={cover_image}
        width={600}
        priority
        quality={100}
        alt={title}
        />
      }
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <div className="flex justify-between gap-3"></div>
        <div className="block">
          <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
            {item.name}
          </h2>
          <div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {description}
          </div>
          <div className='flex items-center space-x-6'>
            <div className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
              {/* <Avatar
                //@ts-ignore
                image={chain?.image}
                alt={chain.name}
                size="xs"
                width={20}
                height={20}
                className="rounded-full"
              /> */}

              <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
                {item.symbol}
              </div>
            </div>

            <div className="relative z-10 mt-3.5 flex flex-col items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
              <p className='text-sm text-gray-400'>Total Supply</p>
              <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
                {item.total_supply || item.max_supply}
              </div>
            </div>

            <div className="relative z-10 mt-3.5 flex flex-col items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
              <p className='text-sm text-gray-400'>Price</p>
              <div className="text-sm text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2 flex items-center">
                {(item.price_per_mint as number/ 10**18).toFixed(2)} <AlephZero className='inline'/>
              </div>
            </div>
          </div>
          {
            isRunning &&
              <div className='mt-4'>
                Ends in: {days}D {hours}H {minutes}M {seconds}S
              </div>
          }
        </div>
      </div>
    </div>
  );
}
