'use client';

import { useState } from 'react';
import Image from '@/components/ui/image';
import { useLayout } from '@/lib/hooks/use-layout';
import Button from '@/components/ui/button';
import ModalDetail from '@/components/collection/modal-detail';

type NFTGridUploadProps = {
  data: any;
};

export default function NFTGridUpload({ data }: NFTGridUploadProps) {
  const { layout } = useLayout();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="relative block w-full">
        <Image
          src={data.preview}
          width={450}
          height={450}
          alt=""
          className="w-full cursor-pointer transition duration-300 ease-in-out hover:scale-110"
          // onLoad={() => {
          //   URL.revokeObjectURL(data.preview);
          // }}
          onClick={handleOpenModal}
        />
      </div>

      <div className="z-50 p-5">
        <div className="text-sm font-medium text-black dark:text-white">
          {data?.metadata?.name}
        </div>
        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            {data?.metadata.description}
          </div>
        </div>
      </div>
      <ModalDetail
        show={isOpen}
        image={data.preview}
        metadata={data?.metadata}
        handleClose={handleCloseModal}
      />
    </div>
  );
}
