'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/ui/button';
import NFTGridUpload from '@/components/collection/nft-card-upload';

export default function UploadAsset() {
  const [files, setFiles] = useState([]);
  const [uploadedData, setUploadedData] = useState<any>([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: any) => {
      setFiles(acceptedFiles);
    },
  });

  function parse(file: File) {
    // Always return a Promise
    return new Promise((resolve, reject) => {
      let content = '';
      const reader = new FileReader();
      // Wait till complete
      reader.onloadend = function (e: any) {
        content = e.target.result;
        const result = JSON.parse(content as string);
        resolve(result);
      };
      // Make sure to handle error states
      reader.onerror = function (e: any) {
        reject(e);
      };
      reader.readAsText(file);
    });
  }

  const handleReupload = () => {
    setFiles([]);
    setUploadedData([]);
  };

  const handleMetadata = async (files: any) => {
    const data: any = [];
    for (const file of files) {
      const id = file.name.split('.')[0] - 1;
      if (file.type.includes('image')) {
        data[id] = {
          id,
          preview: URL.createObjectURL(file),
        };
      }
      if (file.type.includes('json')) {
        const metadata = await parse(file);
        data[id].metadata = metadata;
      }
    }
    setUploadedData(data);
  };

  useEffect(() => {
    handleMetadata(files);
  }, [files]);

  console.log(uploadedData);

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-xl">
            {uploadedData.length == 0
              ? 'Drop your NFT assets below to launch!'
              : 'Preview Uploaded'}
          </h4>
        </div>
      </div>
      {uploadedData.length == 0 ? (
        <div className="mb-8">
          <div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
            <div
              {...getRootProps({
                className:
                  'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
              })}
            >
              {/* @ts-expect-error */}
              <input webkitdirectory="" {...getInputProps()} />
              <div className="text-center">
                <p className="mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
                  Click here or Drag 'n' drop NFT assets folder here
                </p>
                <Button>Click Here</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {uploadedData.length > 0 ? (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <Button shape="rounded" onClick={handleReupload}>
                ReUpload
              </Button>
            </div>
          </div>
          <div className="mb-8">
            <div className="grid gap-5 sm:grid-cols-4 md:grid-cols-6 3xl:!grid-cols-6 4xl:!grid-cols-5">
              {uploadedData.map((nft: any, index: number) => (
                <NFTGridUpload key={index} data={nft} />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
