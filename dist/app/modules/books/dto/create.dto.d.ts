import { BookStatusEnum, DiscountTypeEnum } from 'src/types/other/enums.types';
import { NewBook } from '../infrastructure/entity/entity';
export declare class CreateBookDto implements NewBook {
    name: string;
    title: string;
    writer_id: string;
    share_house: string;
    editor: string;
    release_year: number;
    description: string;
    status: BookStatusEnum;
    cover_type_id: string;
    weight: number;
    page_count: number;
    isbn: string;
    price: number;
    price_usd: number;
    discount: number;
    discount_type: DiscountTypeEnum;
    stock: number;
}
