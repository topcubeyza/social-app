import React from 'react';
import { alertContext } from '../Modules/Main/AlertProvider';

function useAlert() {
  const alert = React.useContext(alertContext);
    
  return alert;
}

export default useAlert;