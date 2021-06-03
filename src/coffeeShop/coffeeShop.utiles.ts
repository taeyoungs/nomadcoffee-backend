import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import path from 'path';

export const createSlug = (name: string) =>
  name
    .match(/[^\s]+/g)
    ?.join('-')
    .toLowerCase() as string;

export const processCategory = (category: string) => {
  const slug = createSlug(category);

  return {
    where: {
      name: category,
    },
    create: {
      name: category,
      slug,
    },
  };
};

export const handleFile = async (file: FileUpload, id: number) => {
  const { filename, createReadStream } = await file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const writeStream = createWriteStream(
    path.join(process.cwd(), 'uploads', newFilename)
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
};
