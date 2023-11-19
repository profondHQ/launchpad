'use client';
import { useState, useEffect } from 'react';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';

export default function AnalyticDashboard() {
  const { isDarkMode } = useIsDarkMode();
  const [theme, setTheme] = useState('transparent');
  const [key, setKey] = useState(1);
  console.log('isDarkMode ', isDarkMode);

  useEffect(() => {
    setTheme(isDarkMode ? 'night' : 'transparent');
    setKey(key + 1);
  }, [isDarkMode]);

  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="mb-6 grid grid-cols-1 gap-12 sm:mb-10">
        <div className="flex flex-col justify-center">
          <h2 className="mb-10 text-center text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
            Analytic Dashboard
          </h2>
          <iframe
            key={key}
            src={`https://metabase.profond.ai/public/dashboard/e427d22a-c542-4120-ae7e-cc7e578075e2#theme=${theme}&bordered=false&titled=false`}
            height="750"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
