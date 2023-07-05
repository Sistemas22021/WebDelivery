import React from "react";

export const Grid = () => {

return(
    <>
    <html>
        <head>
            <title>Tabla de Pedidos Registrados</title>
        </head>
        <body>

        <table>
        <tr>
            <th>Id</th>
            <th>Hora Creada</th>
            <th>Estatus</th>
            <th>Contenido</th>
            <th>Total</th>
            <th>Nombre Cliente</th>
            <th>Id Cliente  </th>
            <th>Direccion Cliente</th>
            <th>Correo Cliente</th>
        </tr>
        <tr>
            <td>001</td>
            <td>12:25</td>
            <td>Completed</td>
            <td>3 Hamburguesas</td>
            <td>150 $</td>
            <td>Ulises Hernandez</td>
            <td>29582637</td>
            <td>Porlamar Mucuraparo</td>
            <td>ulisesjhm@gmail.com</td>
        </tr>
        <tr>
            <td>002</td>
            <td>14:24</td>
            <td>Cancelled</td>
            <td>7 Hamburguesas, 2 Pollos</td>
            <td>650 $</td>
            <td>Jysus Figuera</td>
            <td>22382637</td>
            <td>La Asunsion Residencias</td>
            <td>jysusfiguera@gmail.com</td>
        </tr>
        <tr>
            <td>003</td>
            <td>22:25</td>
            <td>On Progress</td>
            <td>1 Hamburguesas</td>
            <td>50 $</td>
            <td>Lazaro</td>
            <td>27121637</td>
            <td>Macanao junto a los pescadores en el barrio mi barquito</td>
            <td>lazaromarc@yahoo.com</td>
        </tr>
        </table>

        </body>
    </html>
    </>
  );
};

export default Grid;