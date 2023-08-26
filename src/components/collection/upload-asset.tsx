'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/ui/button';
import NFTGridUpload from '@/components/collection/nft-card-upload';
import ModalDetail from '@/components/collection/modal-detail';


export default function UploadAsset() {

  const [files, setFiles] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [jsonFile, setJsonFile] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: any) => {
      const imageData: any = [];
      const jsonData: any = [];
      acceptedFiles.forEach((file: any) => {
        const id = file.name.split('.')[0] - 1;
        if (file.type.includes('image')) {
          Object.assign(file, {
            id,
            preview: URL.createObjectURL(file),
          })
          imageData[id] = (file);
        }
        if (file.type.includes('json')) {
          jsonData[id] = file;
        }
      });
      setImageFile(imageData);
      setJsonFile(jsonData);
    },
  });


  const handleReupload = () => {
    setImageFile([]);
    setJsonFile([]);
    setFiles([]);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <ModalDetail />
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <h4 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-xl">
            {imageFile.length == 0 ? "Drop your NFT assets below to launch!" : "Preview Uploaded" }
          </h4>
        </div>
      </div>
      {imageFile.length == 0 ? (
        <div className="mb-8">
          <div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
            <div
              {...getRootProps({
                className:
                  'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
              })}
            >
              {/* @ts-expect-error */}
              <input webkitdirectory="" {...getInputProps()}/>
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
      
      {imageFile.length > 0 ? (
        <>
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <Button shape="rounded" onClick={handleReupload}>ReUpload</Button>
          </div>
        </div>
        <div className="mb-8">
          <div className="grid gap-5 sm:grid-cols-4 md:grid-cols-6 3xl:!grid-cols-6 4xl:!grid-cols-5">
            {imageFile.map((nft: any, index: number) => (
              <NFTGridUpload
                key={index}
                image={nft.preview}
                jsonData={jsonFile[nft.id]}
              />
            ))}
          </div>
        </div>
      </>
      ) : null}
    </>
  );
}