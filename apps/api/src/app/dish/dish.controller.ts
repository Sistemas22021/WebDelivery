import { Controller, Get} from '@nestjs/common';
import { DishService } from './dish.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DishDto } from './dto/dish.dto';

@ApiTags('Platillos')
@Controller('dish')
export class DishController {


    constructor(private dishService: DishService) {}



    @ApiOkResponse({type: DishDto,isArray: true})
    @ApiInternalServerErrorResponse({description: 'Ocurrio un error en el servidor.'})
    @Get()
    fetchDishes(){
        return this.dishService.fetchDishes();
    }


}
