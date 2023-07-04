import React, { useState } from 'react';

import axios from 'axios';

interface Platillo {
  plate_id: string;
  name: string;
  description: string;
  price: number;
}

interface ElementoPedido {
  platillo: Platillo;
  conteo: number;
}

export function BotonAgregarManejador(
  e: any,
  platillo: Platillo,
  listaPedido: ElementoPedido[],
  setListaPedido: (lista: ElementoPedido[]) => void
) {
  if (!listaPedido) {
    listaPedido = []; // Si listaPedido es undefined, se asigna un arreglo vacío
  }

  const busqueda = listaPedido.find(
    (elemento: ElementoPedido) =>
      elemento.platillo.plate_id === platillo.plate_id
  );

  if (!busqueda) {
    const nueva_lista = [...listaPedido, { platillo, conteo: 1 }];
    setListaPedido(nueva_lista);
  } else {
    const nueva_lista = listaPedido.map((elemento: ElementoPedido) => {
      if (elemento.platillo.plate_id === platillo.plate_id) {
        elemento.conteo++;
      }
      return elemento;
    });
    setListaPedido(nueva_lista);
  }
}

export function BotonRemoverManejador(
  e: any,
  platillo: Platillo,
  listaPedido: ElementoPedido[],
  setListaPedido: (lista: ElementoPedido[]) => void
) {
  const busqueda = listaPedido.find(
    (elemento: ElementoPedido) =>
      elemento.platillo.plate_id === platillo.plate_id
  );

  if (busqueda) {
    const aux = listaPedido.map((elemento: ElementoPedido) => {
      if (elemento.platillo.plate_id === platillo.plate_id) {
        elemento.conteo--;
      }
      return elemento;
    });

    const nueva_lista = aux.filter(
      (elemento: ElementoPedido) => elemento.conteo >= 0
    );
    setListaPedido(nueva_lista);
  }
}

export async function handleSubmit(
  e: any,
  pedido: string,
  setListaPedido: (lista: ElementoPedido[]) => void,
  setPedido: (pedido: string) => void,
  setResponse: (response: string) => void,
  setValues: (values: any) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> // Agrega este parámetro
) {
  e.preventDefault();
  setResponse('');

  if (pedido === '') {
    return;
  }

  setIsLoading(true); // Activa la barra de carga

  try {
    const formData: any = new FormData(e.target); // Obtén los datos del formulario
    const requestData = Object.fromEntries(formData.entries()); // Convierte los datos del formulario en un objeto
    const response = await axios.post('/api/orders', requestData); // Envía los datos a la API utilizando Axios

    if (response.status === 200 || response.status === 201) {
      setListaPedido([]);
      setPedido('');
      setResponse(
        '\n Su pedido está en proceso, revise su correo para verificar su pedido, gracias! 😊 \n'
      );
      setValues({
        nombre: '',
        cedula: '',
        direccion: '',
        pedido: '',
        correo_electronico: '',
      });
      
        setIsLoading(true);
     
    }
    // Maneja la respuesta de la API según tus necesidades
    console.log(response.data); // Ejemplo: imprime la respuesta en la consola
  } catch (error) {
    setResponse(
      'Hubo un error al realizar su pedido 😢. Por favor intente de nuevo.'
    );
    // Maneja el error según tus necesidades
    setIsLoading(false); // Desactivar la barra de carga una vez que se complete la acción

    console.error(error);
  }
}
