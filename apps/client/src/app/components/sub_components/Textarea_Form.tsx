import React from 'react';

const Form_components ()=>{

return(

    <>
    <button
    className="btn btn-outline w-1/2 btn-success"
    type="submit"
    disabled={!isFormValid}
  >
    {t('btn.btn-form')}
  </button>
    </>

);


};

export default Form_components;