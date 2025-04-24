import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Controller('test')
export class TestController {

  @Get()
  getHello(
    @Query('name')name: string
  ) {
    return 'Hello ' + name;
  }

  @Get('object')
  getObject() {
    return { id: 1, nom: 'Ly', prenom: 'Khun' }
  }

  @Get('error')
  getError() {
    // throw new NotFoundException(); // 404
    // throw new UnauthorizedException(); // 401
    // throw new BadRequestException('error message'); // 400
    throw new UnprocessableEntityException('error message'); // 422
  }
}
