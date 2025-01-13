import { IsString ,IsNotEmpty, IsNumber, Min  } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    author:string;

    @IsNumber()
    @Min(1000)
    PublishedAt : number;

    @IsString()
    @IsNotEmpty()
    genre:string;

    @IsNumber()
    @Min(0)
    price: number


    



}
