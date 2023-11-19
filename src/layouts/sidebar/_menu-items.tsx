import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';
import { LockIcon } from '@/components/icons/lock-icon';

export const defaultMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Analytics',
    icon: <CompassIcon />,
    href: routes.analytics,
  },
  {
    name: 'Create',
    icon: <CompassIcon />,
    href: routes.lauchCollection,
    dropdownItems: [
      {
        name: 'Collection',
        icon: <CompassIcon />,
        href: routes.lauchCollection,
      },
      {
        name: 'Coin',
        icon: <CompassIcon />,
        href: routes.lauchCoin,
      },
    ],
  },
  {
    name: 'Profile',
    icon: <CompassIcon />,
    href: routes.profile,
  },
  {
    name: 'Sale Token',
    icon: <CompassIcon />,
    href: routes.saleToken,
  },
];
