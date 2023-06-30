import { Order } from "../../shared/classes/Order.class";

export function fixtureGenerateOrderExample(){
      const client_name = "Jesus Figuera"
      const client_id = "29.660.012"
      const client_email = "jesusfiguera20@gmail.com"
      const client_address = "La Asuncion"
      const mock_order = new Order(client_name,client_id,client_email,client_address);
      return mock_order;
}