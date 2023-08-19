'use client';

import { useState, useEffect } from 'react';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import ModalDetail from '@/components/collection/modal-detail';

type NFTGridUploadProps = {
  image: string;
  jsonData: any;
};

export default function NFTGridUpload({
  image,
  jsonData,
}: NFTGridUploadProps) {
  const { layout } = useLayout();
  const [metadata, setMetadata] = useState<any>({});

  useEffect(() => {
    if (jsonData) {
      const fileReader = new FileReader();
      fileReader.readAsText(jsonData);
      fileReader.onload = () => {
        const data = JSON.parse(fileReader.result as string);
        setMetadata(data);
      }
    }
  }, [jsonData]);

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative block w-full"
      >
        <Image
          src={image}
          width={450}
          height={450}
          alt=""
          className="w-full"
          // onLoad={() => {
          //   URL.revokeObjectURL(image);
          // }}
        />
      </div>

      <div className="p-5">
        <AnchorLink
          href={
            (layout === LAYOUT_OPTIONS.MINIMAL ? '' : `/${layout}`) +
            routes.nftDetails
          }
          className="text-sm font-medium text-black dark:text-white"
        >
          {metadata?.name}
        </AnchorLink>
        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            {metadata.description}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Button shape="rounded" variant="solid" color="gray" className="dark:bg-gray-800">edit</Button>
          <Button shape="rounded" variant="solid" color="danger" className="dark:bg-danger-800">delete</Button>
        </div>
      </div>
      {/* <ModalDetail /> */}
    </div>
  );
}
