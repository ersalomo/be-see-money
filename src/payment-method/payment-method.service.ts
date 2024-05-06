import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentMethod } from '@prisma/client';
import { StorageService } from '@/storage/storage.service';

@Injectable()
export class PaymentMethodService {
  constructor(
    private _prismaServ: PrismaService,
    private _storageServ: StorageService,
  ) {}

  async verifyPaymentName(owner: string, name: string) {
    const cat = await this._prismaServ.paymentMethod.findFirst({
      where: {
        methodName: name,
        userId: owner,
      },
    });
    if (cat) {
      throw new HttpException('Payment method already exists', 400);
    }
  }

  async create(
    userId: string,
    req: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    await this.verifyPaymentName(userId, req.methodName);
    // await this._storageServ.writeFile(req.file, req.image);
    return await this._prismaServ.paymentMethod.create({
      data: {
        image: req.image,
        methodName: req.methodName,
        desc: req.desc,
        userId,
      },
    });
  }

  async findAll(userId: string): Promise<PaymentMethod[]> {
    return this._prismaServ.paymentMethod.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentMethod`;
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return `This action updates a #${id} paymentMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentMethod`;
  }
}
