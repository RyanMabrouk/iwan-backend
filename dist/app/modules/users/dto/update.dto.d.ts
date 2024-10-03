import { RolesEnum } from 'src/types/other/enums.types';
import { UpdateUser } from './../infrastructure/entity/entity';
export declare class UpdateUserDto implements UpdateUser {
    roles?: RolesEnum[];
    avatar?: string;
    first_name?: string;
    last_name?: string;
}
