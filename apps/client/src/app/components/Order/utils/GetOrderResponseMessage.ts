import { HttpStatusCode } from "axios";

export default (http_status: HttpStatusCode): string => {
    switch(http_status) {
        case 200: return 'Su orden esta siendo procesada, lo estaremos contactando, gracias por preferinos!';
        case 201: return 'Su orden esta siendo procesada, lo estaremos contactando, gracias por preferinos!';
        case 422: return 'Hubo un error en los datos ingresados, intente denuevo.';
        default: return 'No hubo respuesta del servidor.'; 
    }
}