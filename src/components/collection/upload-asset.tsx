'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/ui/button';
import NFTGridUpload from '@/components/collection/nft-card-upload';
import { uploadFiles } from '@/utils/common';
import axios from 'axios';

export default function UploadAsset({metadataColl, setMetadataColl}: {metadataColl: any, setMetadataColl: any}) {
  const [files, setFiles] = useState([]);
  const [uploadedData, setUploadedData] = useState<any>([]);
  const [uploaded, setUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
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
        if (!data[id]) {
          data[id] = {
            id: id,
            preview: URL.createObjectURL(file),
          };
        } else {
          data[id].id = id;
          data[id].preview = URL.createObjectURL(file);
        }
      }
      if (file.type.includes('json')) {
        const metadata = await parse(file);
        if (!data[id]) {
          data[id] = {
            metadata: metadata,
          };
        } else {
          data[id].metadata = metadata;
        }
      }
    }
    setUploadedData(data);
  };

  useEffect(() => {
    handleMetadata(files);
  }, [files]);

  const onUpload = async()=>{
    try{
      setLoading(true)
      let newUploadedData: any[] = []
      const imagefiles: any = files.filter((file:any) => file.type.includes('image'))
      const res = await Promise.all(imagefiles.map((file:any) => uploadFiles([file])))
      uploadedData?.forEach((uploaded:any, idx: number) => {
        uploaded.metadata.image = `ipfs://${res[idx]}/${imagefiles[idx].name}`
        newUploadedData.push(uploaded)
      })
      const newUploadedMetadata = newUploadedData.map((newUploaded:any) => newUploaded.metadata)
      
      await axios.post('/api', {metadatas: newUploadedMetadata})

      const metadataFiles  = newUploadedMetadata.map((data, idx) => {
        const str = JSON.stringify(data);
        const file = new File([str], `${idx}.json`, {type: "application/json"})
        return file
      })
      const metadataRootCid = await uploadFiles(metadataFiles)
      setMetadataColl({
        ...metadataColl,
        base_uri: `ipfs://${metadataRootCid}`
      })
      await axios.put('/api')
      setLoading(false)
      setUploaded(true)
    }catch(error){
      setLoading(false)
    }
  }

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
          <div className='flex items-center justify-center w-full'>
          <Button shape="rounded" variant="solid" color="primary" className="mr-2" isLoading={loading} onClick={onUpload}>
            {uploaded ? 'Uploaded' : 'Upload'}
          </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
