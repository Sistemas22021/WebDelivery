
import { DISHES_DATA } from "../../../../dishes-data/dishes.data";
export function getDishFromData(id: string) {
    return DISHES_DATA.find(dish => dish.id === id);
}