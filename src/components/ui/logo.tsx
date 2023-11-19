'use client';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useLayout } from '@/lib/hooks/use-layout';
import logo from '@/assets/images/profond.webp';
import routes from '@/config/routes';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import cn from 'classnames';

interface LogoPropTypes {
  className?: string;
}

export default function Logo({ className }: LogoPropTypes) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  return (
    isMounted && (
      <AnchorLink
        href={{
          pathname:
            routes.home + (layout === LAYOUT_OPTIONS.MINIMAL ? '' : layout),
        }}
        className={cn('flex w-28 outline-none sm:w-32 4xl:w-36', className)}
      >
        <span className="relative flex overflow-hidden">
          <Image src={logo} alt="Profond" height={60} priority />
        </span>
      </AnchorLink>
    )
  );
}
