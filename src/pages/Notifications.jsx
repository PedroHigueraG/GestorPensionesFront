import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header'
import Footer from '../components/footer'

function Notifications() {
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/notifications')
        .then(response => {
            setNotificaciones(response.data);
        })
        .catch(error => console.error('Error al obtener las notificaciones:', error));
    }, []);


    return (
    <div className="h-screen">
      <Header />
      <main className="flex-grow p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 mt-4">Historial de notificaciones</h2>
      <a href="./" className="text-blue-500 hover:underline cursor-pointer">Volver</a>
      <div className="p-4">
        {notificaciones.map(notificacion => (
          <div key={notificacion.id} className=" bg-white p-6 rounded-lg shadow-md mb-4">
            <div>
                <h3 className="text-l font-semibold mb-2">Notificación por {notificacion.tipo}</h3>
                <p className="text-gray-700 mb-2 ">{notificacion.mensaje}</p>
                <p className="text-gray-400 mb-2 ">{notificacion.fecha}</p>
            </div>

          </div>
        ))}
      </div>
      </main>
      <Footer />
    </div>
    
  );
}

export default Notifications;
