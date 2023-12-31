import { Suspense } from 'react';
import { Fira_Code } from 'next/font/google';
import cn from 'classnames';
import { QueryClientProvider } from '@/app/shared/query-client-provider';
import { ThemeProvider } from '@/app/shared/theme-provider';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';

// base css file
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
// import { WalletContextProvider } from '@/providers/WalletContextProvider';
import SelectWalletModal from '@/components/sub-connect/SelectWalletModal';
import SelectAccountModal from '@/components/sub-connect/SelectAccountModal';
import InkathonWalletContextProvider from '@/providers/InkathonWalletContextProvider';

const fira_code = Fira_Code({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Profond',
  description: 'Profond',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn('dark', fira_code.className)}>
      <head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </head>
      <body>
        <QueryClientProvider>
          <ThemeProvider>
            {/* <WalletContextProvider> */}
            <InkathonWalletContextProvider>
              <Suspense fallback={null}>
                <ModalsContainer />
                <DrawersContainer />
              </Suspense>
              <SelectWalletModal theme={'dark'} />
              <SelectAccountModal theme={'dark'} />
              {children}
            </InkathonWalletContextProvider>
            {/* </WalletContextProvider> */}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
