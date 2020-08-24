import React, {useState} from 'react';
import './style.css';

import MenuItem from './menuItem';
import MenuIcon from '@material-ui/icons/Menu';

 function ButtonAdmin({idAdmin = () => {}, admin, load}) {

  const [box, setBox] = useState(false);

  function handleClick() {
    setBox(!box);
  };

  return (
    <>
      <div>
      <button id="menuAdmin" onClick={handleClick}>
        <MenuIcon/>
      </button>     
    </div>
     {box ? <MenuItem admin={admin} load={load} idAdmin={idAdmin}/> : null}
     </>
  );
}

export default ButtonAdmin;