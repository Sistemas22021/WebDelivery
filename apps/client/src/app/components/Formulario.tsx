import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toArray } from 'rxjs';
import { useTranslation } from 'react-i18next';
import {
  BotonAgregarManejador,
  BotonRemoverManejador,
  handleSubmit
} from './services/service_form';
import btn from './sub_components/Textarea_Form';

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

function Formulario() {
  const [t] = useTranslation('global'); // Para la traducción


  const [values, setValues] = useState({
    nombre: '',
    cedula: '',
    direccion: '',
    pedido: '',
    correo_electronico: '',
  });

  const validateForm = () => {
    const { nombre, cedula, direccion, correo_electronico } = values;
    const isValid =
      nombre !== '' &&
      cedula !== '' &&
      direccion !== '' &&
      correo_electronico !== '';
    setIsFormValid(isValid);
  };
  const [isLoading, setIsLoading] = useState(false); // btn cargando
  const [isFormValid, setIsFormValid] = useState(false); //formulario
  const [listaPlatillos, setListaPlatillos] = useState<Platillo[]>([]);
  const [listaPedido, setListaPedido] = useState<ElementoPedido[]>([]);
  const [pedido, setPedido] = useState('');
  const [response, setResponse] = useState('');

  //Los useEffects deberia optimizarlos
  useEffect(() => {
    const loadProducts = async () => {
      const request = await axios.get('/api/plate');

      if (request.status === 200) {
        setListaPlatillos(request.data);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let nuevo_pedido = '';
    let total = 0;

    for (const elemento of listaPedido) {
      const aux = `${elemento.platillo.name} ${elemento.platillo.price} X ${elemento.conteo}\n`;
      total += elemento.platillo.price * elemento.conteo;
      nuevo_pedido = nuevo_pedido.concat(aux);
    }

    nuevo_pedido = nuevo_pedido.concat(
      '---------------------------------------------------------------------\n'
    );
    nuevo_pedido = nuevo_pedido.concat(`${t('api.paymet')}: ${total} $`);

    if (listaPedido.length !== 0) {
      setPedido(nuevo_pedido);
    }
  }, [listaPedido]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    validateForm();
  };
  function handleBotonAgregarClick(e: any, platillo: Platillo) {
    BotonAgregarManejador(e, platillo, listaPedido, setListaPedido);
  }

  function handleBotonQuitarClick(e: any, platillo: Platillo) {
    BotonRemoverManejador(e, platillo, listaPedido, setListaPedido);
  }

  return (
    <form
      className="mi-form w-full font-bold text-info text-lg"
      onSubmit={(e) =>
        handleSubmit(
          e,
          pedido,
          setListaPedido,
          setPedido,
          setResponse,
          setValues,
          setIsLoading // Pasa setIsLoading como un parámetro adicional
        )
      }
    >
      <div className="flex justify-between">
        <div className="m-1">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="nombre">
              <span className="label-text text-info">{t('form.name')}</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              required
              placeholder={t('form.label_name')}
              className="input shadow-lg input-ghost w-full  max-w-xs"
            />
          </div>
        </div>

        <div className="m-1">
          <label className="label" htmlFor="cedula">
            <span className="label-text text-info ">{t('form.id')}</span>
          </label>
          <input
            required
            className="input shadow-lg  input-ghost w-full max-w-xs"
            type="number"
            id="cedula"
            name="cedula"
            value={values.cedula}
            onChange={handleChange}
            placeholder="12000000"
          />
        </div>
      </div>

      <div className="">
        <label className="label" htmlFor="correo_electronico">
          <span className="label-text text-info">{t('form.email')}</span>
        </label>
        <input
          required
          className="input resize-none shadow-lg input-ghost w-full"
          id="correo_electronico"
          type="email"
          name="correo_electronico"
          value={values.correo_electronico}
          onChange={handleChange}
          placeholder="lospolloshermanos@email.com"
        />
      </div>

      <div className="">
        <label className="label" htmlFor="direccion">
          <span className="label-text  text-info">{t('form.direction')}</span>
        </label>
        <textarea
          required
          maxLength="100"
          className="input resize-none shadow-lg  input-ghost w-full"
          id="direccion"
          name="direccion"
          rows={2}
          value={values.direccion}
          onChange={handleChange}
          placeholder={t('form.label_direc')}
        ></textarea>
      </div>

      <label className="label mt-2 mb-2" htmlFor="">
        <span className="label-text text-info">{t('form.order')}</span>
      </label>
      <div className="flex flex-col  gap-2">
        {listaPlatillos.map((platillo: Platillo) => (
          <div
            key={platillo.plate_id}
            className=" flex  flex-row text-sm rounded text-start px-2 shadow-lg "
          >
            <span className="indicator-item badge badge-success">
              {platillo.price + '$'}
            </span>
            <p className=" self-center mx-2 flex-col w-1/2 text-base">
              {platillo.name}
            </p>

            <div
              onClick={(e) => handleBotonAgregarClick(e, platillo)}
              className="ml-5 pb-1 btn-circle btn text-2xl btn-ghost"
            >
              {' '}
              +
            </div>

            <div
              onClick={(e) => handleBotonQuitarClick(e, platillo)}
              className="ml-5 pb-1 btn-circle btn text-2xl btn-ghost"
            >
              {' '}
              -
            </div>
          </div>
        ))}
      </div>

      <textarea
        className="textarea text-info resize-none input-bordered w-full mt-3"
        id="pedido"
        name="pedido"
        rows={7}
        readOnly
        value={pedido}
        onChange={handleChange}
        placeholder={t('form.label_order')}
      ></textarea>

      {response.length > 0 ? <p>{response}</p> : <></>}

      
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mr-3"></div>
              <span className="text-lg font-semibold">Cargando...</span>
            </div>
            <p className="text-gray-600">Por favor, espere.</p>
          </div>
        </div>)}


      <button
        className="btn btn-outline w-1/2 btn-success"
        type="submit"
        
      >
        {t('btn.btn-form')}
      </button>
      <div>
    
    </div>
    </form>
  );
}

export default Formulario;
