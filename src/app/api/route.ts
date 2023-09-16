import {writeFile, mkdir, rmdir} from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path'

export async function POST(request: Request) {
  const {metadatas} = await request.json()
  await mkdir("./temp2");
  for(let i=0; i< metadatas.length; i++) {
    const fileName = metadatas[i].image.split('/').pop()
    const nameOnly = fileName.split('.')[0]
    await writeFile(`./temp2/${nameOnly}.json`, JSON.stringify(metadatas[i]))
  }
  return NextResponse.json({result: "written"})
}

export async function PUT() {
  await rmdir("./temp2", {recursive: true});
  return NextResponse.json({result: "deleted"})
}