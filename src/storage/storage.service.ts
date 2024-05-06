import { Injectable } from '@nestjs/common';
// import fs from 'fs';
import * as fs from 'fs';
import { Readable } from 'stream';

// @Injectable()
export class StorageService {
  private _folder: string;
  constructor(folder: string = 'public') {
    this._folder = folder;
    if (!fs.existsSync(this._folder)) {
      fs.mkdirSync(this._folder, { recursive: true });
    }
  }

  writeFile(file: Readable, filename: string) {
    // const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (err) => reject(err));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }

  async deleteFile(filename: string) {
    const oldData = `${this._folder}/${filename}`;
    fs.unlink(oldData, (err) => {
      if (err) {
        console.error(`Error Storage service ${err}`);
      } else console.error(`Storage service data deleted ${err}`);
    });
  }
}
