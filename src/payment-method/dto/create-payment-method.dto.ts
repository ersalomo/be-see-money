import { Readable } from 'stream';

export class CreatePaymentMethodDto {
  methodName: string;
  image?: string;
  file?: Express.Multer.File;
  meta?: any;
  desc?: string;
}
