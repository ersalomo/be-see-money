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

  writeFileUpload(file: Express.Multer.File) {
    // const rootPath = process.cwd(); // Mendapatkan root directory proyek saat ini

    // const folderPath = path.join(rootPath, 'public');
    // const folderPath = path.join(__dirname, '..', 'public');
    const folderPath = `${this._folder}/${+new Date()}${file.originalname}`;
    fs.writeFile(
      // path.join(folderPath, image.originalname),
      folderPath,
      file.buffer,
      'binary',
      (err) => {
        console.log(err);
        if (!err) console.log(`${folderPath} created successfully!`);
      },
    );
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
