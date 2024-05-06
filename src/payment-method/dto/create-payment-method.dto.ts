import { Readable } from 'stream';

export class CreatePaymentMethodDto {
  methodName: string;
  image?: string;
  file?: any;
  meta?: any;
  desc?: string;
}
