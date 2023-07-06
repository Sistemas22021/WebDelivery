import { Dispatch, SetStateAction, useState } from "react";
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
  
  const [isMarked, setIsMarked] = useState<boolean>(false);


  function addHandler() {
    const new_order = AddDishToOrdenUtil(prop.dish,prop.order);
    if (!isMarked)
      setIsMarked(true);
    prop.setOrder(new_order);
    
  }
  function removeHandler() {
    const new_order = RemoveDishFromOrderUtil(prop.dish,prop.order);
    const is_marked = new_order.find(order_dish => order_dish.dish.dish_id === prop.dish.dish_id)

    if (!is_marked)
      setIsMarked(false);

    prop.setOrder(new_order);
  }
  
  
  return (
        <div
            key={prop.dish.dish_id}
            className={`
            flex  flex-row 
            text-sm text-start 
            rounded 
            px-2 
            shadow-lg
            ${isMarked && `bg-primary`}`
            
          }
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