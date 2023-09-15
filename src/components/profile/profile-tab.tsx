import { Suspense } from 'react';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/profile/collection-card';
import CoinList from '@/components/profile/coin-list';
import { useLayout } from '@/lib/hooks/use-layout';
// static data
import { newCollections } from '@/data/static/collections';
import { myCoin } from '@/data/static/author-profile';
import Loader from '@/components/ui/loader';

const tabMenu = [
  {
    title: 'My Collection',
    path: 'collection',
  },
  {
    title: 'My Coin',
    path: 'coin',
  },
];

export default function ProfileTab() {
  return (
    <Suspense fallback={<Loader variant="blink" />}>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
            {newCollections?.map((collection) => (
              <CollectionCard
                item={collection}
                key={`collection-key-${collection?.id}`}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div className="space-y-8 md:space-y-10 xl:space-y-12">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {myCoin?.map((coin) => (
                <CoinList
                  key={`coin-${coin?.id}`}
                  name={coin.name}
                  supply={coin.supply}
                />
              ))}
            </div>
          </div>
        </TabPanel>
      </ParamTab>
    </Suspense>
  );
}
