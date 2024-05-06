import { Injectable } from '@nestjs/common';

@Injectable()
class Hash {
  constructor(
    bcript,
    private _salt = 10,
  ) {}
  hashPassword() {}
  async compare(hashedPassword: string, Pass: string) {}
}
