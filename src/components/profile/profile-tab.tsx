import { Suspense, useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import { API_URL } from '@/config/common';
import { WalletContext } from '@/contexts';
import { useInkathon } from '@scio-labs/use-inkathon';
import { getSs58Address } from '@/utils/common';

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
  // const {selectedAccount} = useContext(WalletContext)
  const {activeAccount, activeChain} = useInkathon()
  const [myColls, setMyColls] = useState<any|null>(null)
  const [myCoins, setMyCoins] = useState<any|null>(null)

  const getMyColls = async()=>{
    const res = await axios.get(API_URL + '/collections', 
    {params: {
      owner_address: getSs58Address(activeChain?.ss58Prefix || 0, activeAccount?.address)
    }}
    )
    setMyColls(res.data)
  }

  const getMyCoins = async()=>{
    const res = await axios.get(API_URL + '/coins', 
    {params: 
      {
      minter_address: getSs58Address(activeChain?.ss58Prefix || 0, activeAccount?.address)
      }
    }
  )
    setMyCoins(res.data)
  }

  useEffect(()=>{
    if(activeAccount){
      getMyColls()
      getMyCoins()
    }
  },[activeAccount])

  return (
    <Suspense fallback={<Loader variant="blink" />}>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
            {myColls?.map((collection:any, idx:number) => (
              <CollectionCard
                item={collection}
                key={`collection-key-${collection.contract_address}`}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div className="space-y-8 md:space-y-10 xl:space-y-12">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {myCoins?.map((coin:any) => (
                <CoinList
                  key={`coin-${coin?.contract_address}`}
                  name={coin.name}
                  symbol={coin.symbol}
                  supply={coin.total_supply}
                />
              ))}
            </div>
          </div>
        </TabPanel>
      </ParamTab>
    </Suspense>
  );
}
