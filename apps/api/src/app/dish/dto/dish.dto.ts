import { ApiProperty } from '@nestjs/swagger';

export class DishDto {


    @ApiProperty({example: 1})
    dish_id: number;

    @ApiProperty({example: 'South Valley'})
    name: string;

    @ApiProperty({example: 'Chorizo, huevos, papas, chile rojo y queso.'})
    description: string;

    @ApiProperty({example: 45.00})
    price: number;
}