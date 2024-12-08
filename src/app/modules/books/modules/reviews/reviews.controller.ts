import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
  Query,
} from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { NewReviewDto, QueryReviewDto, UpdateReviewDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { ReviewEntity } from './infrastructure/entity';
import { IsPublic } from 'src/app/auth/IsPublic.decorator';
import { AuthenticatedUser } from 'src/app/auth/AuthUser.decorator';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get()
  async findMany(@Query() query: QueryReviewDto): Promise<ReviewEntity[]> {
    return this.reviewService.findMany(query);
  }

  @Post()
  async createOne(@Body() payload: NewReviewDto): Promise<ReviewEntity> {
    const res = await this.reviewService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    const res = await this.reviewService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: string,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<ReviewEntity> {
    const res = this.reviewService.deleteOne({ id, user_id: userJwt.sub });
    this.trx.commit();
    return res;
  }
}
