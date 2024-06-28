import { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {

  const [usuario, setUsuario] = useState({ nombre: '', saldo: 0 });

  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/users/1000066664')
      .then(response => {
        setUsuario({ nombre: response.data.nombre, saldo: response.data.saldo });
      })
      .catch(error => console.error('Error al obtener los datos del usuario:', error));
  }, []); // El array vacío asegura que la petición se haga solo una vez

    return (
      <header className="flex justify-between items-center p-4 bg-blue-950 text-white">
        <h1 className="font-bold">BTG Pactual</h1>
        <div>
          <span>Bienvenido {usuario.nombre}</span>
          <span className="ml-4">Saldo: ${usuario.saldo.toLocaleString()}</span>
        </div>
      </header>
    )
}

export default Header