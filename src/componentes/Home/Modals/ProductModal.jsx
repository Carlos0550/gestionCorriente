import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppContext } from '../../context';
import { message } from 'antd';
import "./productModal.css"
import BackTop from 'antd/es/float-button/BackTop';
import { useNavigate } from 'react-router-dom';
const ProductModal = ({ closeModal }) => {
  const { clientData, addDebt, addingDebt, debtError, debtSuccess } = useAppContext()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate()
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      closeModal();
    }, 0);
  };


  //  Formulario
  const fechaActual = new Date();
  const firstClient = clientData[0]
 
  const [values, setValues] = useState({
    nameProduct: "",
    quantity: "",
    price: "",
    change: "ars",
    buyDate: fechaActual.toISOString().split("T")[0],
    nombre_cliente: firstClient.nombre_completo,
    apellido_cliente: firstClient.apellido,
    uuid: firstClient.uuid
  })
  const handleInputChange = (e) => {
    const { value, name } = e.target
    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const validateForm = async(ev) => {
    ev.preventDefault()
    if (!values.nameProduct || !values.change || !values.price || !values.quantity) {
      message.error("Todos los campos son requeridos")
    } else {
      await addDebt(values)
      closeModal()
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        closeModal();
    }
};

useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [navigate]);
  return (
    <>
      <Modal
        title=""
        visible={true}
        onOk={handleOk}
        okText="Cancelar"
        confirmLoading={confirmLoading}
        closeIcon={false}
        width={1000}
        footer={[
          
        ]}
      >
        <div className='container p-3'>
          <div className="columns">
            <div className="column custom-column-addProduct is-background-black">
              <form className='form__addProduct ' onSubmit={validateForm}>
                <h1 className='title is-color-white'>Agregar un producto</h1>

                <div className="field">
                  <label className='label box is-background-white is-color-black'>Nombre producto:
                    <input type="text" name='nameProduct' value={values.nameProduct} onChange={handleInputChange} className='input is-color-black' />
                  </label>

                  <label className='label is-color-black'>Precio Unitario:
                    <input type="text" name='price' value={values.price} onChange={handleInputChange} className='input is-color-black' />
                  </label>

                  <label className='label is-color-black'>Moneda:
                   <div className="select is-rounded ml-2">
                   <select name="change" onChange={handleInputChange} className='select'>
                      <option value="ars"><p>Por defecto pesos</p></option>
                      <option value="usd">Usd</option>
                    </select>
                   </div>
                  </label>

                  <label className='label is-color-black'>Cantidad:
                    <input type="text" name='quantity' value={values.quantity} onChange={handleInputChange} className='input is-color-black' />
                  </label>
                </div>
              </form>
              <button className='button is-size-5 is-warning m-3' type='submit' disabled={addingDebt} style={{ cursor: addingDebt ? "not-allowed" : "" }} onClick={validateForm}>{addingDebt ? "Aguarde..." : "Añadir al fichero"}</button>
              <Button key="update" type="primary" onClick={handleOk} loading={confirmLoading} className='button is-size-5 is-danger m-3'>
                Cerrar Sección
              </Button>
            </div>

          </div>

        </div>

      </Modal>
    </>
  );
};

export default ProductModal;
