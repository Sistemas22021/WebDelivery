import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dish } from "./interfaces/Dish.interface";
import { OrderDish } from "./interfaces/OrderDish.interface";
import addDishToOrder from "./utils/AddDishToOrden.util";
import removeDishFromOrder from "./utils/RemoveDishFromOrder.util";

export default function DishOption(
  prop: { 
    dish: Dish, 
    order: OrderDish[], 
    setOrder: Dispatch<SetStateAction<OrderDish[]>>,
  }
) {
  
  const [isMarked, setIsMarked] = useState<boolean>(false);


  function addHandler() {
    const new_order = addDishToOrder(prop.dish,prop.order);
    if (!isMarked)
      setIsMarked(true);
    prop.setOrder(new_order);
    
  }
  function removeHandler() {
    const new_order = removeDishFromOrder(prop.dish,prop.order);
    const is_marked = new_order.find(order_dish => order_dish.dish.dish_id === prop.dish.dish_id)

    if (!is_marked)
      setIsMarked(false);

    prop.setOrder(new_order);
  }
  useEffect(() =>{
    const is_marked = prop.order.find(order_dish => order_dish.dish.dish_id === prop.dish.dish_id)
    if (is_marked)
      setIsMarked(true);
  },[prop.dish.dish_id, prop.order])
  
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