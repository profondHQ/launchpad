import Image from '@/components/ui/image';
import cn from 'classnames';
import { StaticImageData } from 'next/image';
import Avatar from '@/components/ui/avatar';
import { useLayout } from '@/lib/hooks/use-layout';

type ItemType = {
  id?: string | number;
  title: string;
  cover_image: StaticImageData;
  description: string;
  chain: {
    image?: StaticImageData;
    name: string;
  };
};
type CardProps = {
  item: ItemType;
  className?: string;
};

export default function CollectionCard({ item, className = '' }: CardProps) {
  const { title, cover_image, description, chain } = item ?? {};
  const { layout } = useLayout();
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
        className
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <Image
          src={cover_image}
          width={600}
          priority
          quality={100}
          alt={title}
        />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <div className="flex justify-between gap-3"></div>
        <div className="block">
          <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
            {title}
          </h2>
          <div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {description}
          </div>
          <div className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
            <Avatar
              //@ts-ignore
              image={chain?.image}
              alt={chain.name}
              size="xs"
              width={20}
              height={20}
              className="rounded-full"
            />

            <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              {chain.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
