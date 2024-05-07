import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@/common/auth.decorator';
import SuccessResponse from '@/responses/SuccessResponse';
import { PaymentMethod } from '@prisma/client';
import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';
import { StorageService } from '@/storage/storage.service';
import * as fs from 'fs';
import * as Mul from 'multer';
import * as path from 'path';
import { LinkImageInterceptor } from '@/link-image/link-image.interceptor';
import { AdminGuard } from '@/admin/admin.guard';

export interface CustomUploadTypeValidatorOptions {
  fileType: string[];
}

@Injectable()
export class CustomUploadFileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }

  public isValid(file?: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);
    return this._allowedMimeTypes.includes(response.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }
}
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];

@ApiTags('Payment Method')
@ApiBearerAuth()
@Controller('/api/payment-methods')
export class PaymentMethodController {
  constructor(private readonly _paymentMethodService: PaymentMethodService) {}

  @Get()
  @UseInterceptors(LinkImageInterceptor)
  @UseGuards(new AdminGuard([0, 1]))
  async findAll(
    @Auth() userId: string,
  ): Promise<SuccessResponse<PaymentMethod[]>> {
    const paymentMethods = await this._paymentMethodService.findAll(userId);
    return new SuccessResponse(paymentMethods, 'success');
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        methodName: { type: 'string' },
        image: {
          type: 'string',
          nullable: true,
          // format: 'binary',
        },
      },
    },
  })
  async create(
    @Auth() userId: string,
    @Body() req: CreatePaymentMethodDto,
    @UploadedFile(
      new ParseFilePipeBuilder() // .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
  ) {
    console.log('Image', image);
    req.image = image.originalname;
    req.file = image;
    return await this._paymentMethodService.create(userId, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._paymentMethodService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this._paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._paymentMethodService.remove(+id);
  }
}
