import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';



;
export const swaggerOptions = {
    customSiteTitle: 'Los Pollos Hermanos', 
    customfavIcon: `${process.cwd()}/apps/api/src/assets/favicon.png`,
    customCss: '.swagger-ui .topbar { display: none }',
    explorer: true
}

const config  = (): Omit<OpenAPIObject, "paths"> => {

    const config = new DocumentBuilder()
        .setTitle('Los Pollos Hermanos Delivery API')
        .setDescription('Interfaz que permite almacenar, pedidos, clientes y platillos del restaurante de comida rapida Los Pollos Hermanos')
        .setVersion('1.0')
        .setTitle('Los Pollos Hermanos API')
        .build();
    
        return config;
    }


export default (app: INestApplication) => SwaggerModule.createDocument(app, config());



