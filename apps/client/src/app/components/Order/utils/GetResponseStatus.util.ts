import { HttpStatusCode } from "axios";

export default function getResponseStatus(status: number): HttpStatusCode {
    switch(status){
        case 200: return HttpStatusCode.Ok;
        case 201: return HttpStatusCode.Created;
        case 422: return HttpStatusCode.UnprocessableEntity;
        case 404: return HttpStatusCode.NotFound;
        default: return HttpStatusCode.InternalServerError
    }
}