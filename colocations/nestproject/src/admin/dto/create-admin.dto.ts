import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateAdminDto extends CreateUserDto {
    readonly items : string 
}
