import { Dispatch, SetStateAction } from "react";
import { DishI } from "../../interfaces/Dish.interface";
import { OrderDishI } from "../../interfaces/OrderDish.interface";
import AddDishToOrdenUtil from "./utils/AddDishToOrden.util";
import RemoveDishFromOrderUtil from "./utils/RemoveDishFromOrder.util";

export default function DishOption(
  prop: { 
    dish: DishI, 
    order: OrderDishI[], 
    setOrder: Dispatch<SetStateAction<OrderDishI[]>>,
  }
) {
  
  
  function addHandler() {
    console.log('add')
    const new_order = AddDishToOrdenUtil(prop.dish,prop.order);
    prop.setOrder(new_order);
    
  }
  function removeHandler() {
    console.log('remove')
    const new_order = RemoveDishFromOrderUtil(prop.dish,prop.order);
    prop.setOrder(new_order);
  }
  
  
  return (
        <div
            key={prop.dish.dish_id}
            className=" flex  flex-row text-sm rounded text-start px-2 shadow-lg "
          >
            <span className="indicator-item badge badge-success">
              {prop.dish.real_price + '$'}
            </span>
            <p className=" self-center mx-2 flex-col w-1/2 text-base">
              {prop.dish.name}
            </p>

            <div onClick={addHandler} className=" mx-1 p-2 btn-circle btn text-2xl btn-ghost">
                +
            </div>
            <div onClick={removeHandler} className=" mx-1 btn-circle  text-2xl  btn btn-ghost ">
                -
            </div>
          </div>
    );
}