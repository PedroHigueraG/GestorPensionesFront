import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header'
import Footer from '../components/footer'

function SuscribeFund() {

    const navigate = useNavigate()
    const location = useLocation();
    const fondo = location.state.fondo;
    const usuario = location.state.usuario;

    const [formData, setFormData] = useState({
        notificacion: 'Email',
        monto: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    const aceptarAccion = async (e) => {
        e.preventDefault();
        const fechaActual = new Date().toLocaleDateString('es-CO');
        
        usuario.fondos_actuales.push({
            IdFondo: fondo.id,
            Nombre: fondo.nombre,
            Fecha_suscripcion: fechaActual,
            Monto: formData.monto
        })

        const usuarioActualizado = {
            saldo: usuario.saldo - formData.monto,
            fondos_actuales: usuario.fondos_actuales
        } 

        const transaccionActual = {
            id: Date.now()+usuario.cedula,
            tipo: 'Apertura',
            monto: formData.monto,
            fecha_transaccion: fechaActual,
            idFondo: fondo.id,
            idUsuario: usuario.cedula
        }

        const notificacionActual = {
            id: Date.now()+usuario.cedula,
            idUsuario: usuario.cedula,
            tipo: formData.notificacion,
            mensaje: 'Se ha realizado la apertura del fondo '+fondo.nombre+' con una cantidad total de $'+formData.monto.toLocaleString(),
            fecha: fechaActual
        }
        if (usuario.saldo > formData.monto){
            try {
                await axios.put(`http://127.0.0.1:8000/users/${usuario.cedula}`, usuarioActualizado); 
                await axios.post('http://127.0.0.1:8000/transactions', transaccionActual); 
                await axios.post('http://127.0.0.1:8000/notifications', notificacionActual); 
                alert('Suscripción exitosa');
                navigate('/funds');
            } catch(error){
                console.error('Error al suscribirse al fondo:', error);
            }
        } else {
            alert('Saldo insuficiente');
            navigate('/funds');
        }

    };

    const cancelarAccion = () => {
        const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar esta acción?');
        if (confirmCancel) {
            navigate('/funds')
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
                <main className="flex-grow p-4 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4 mt-4">Suscribirse a fondo</h2>
                    <p>Diligencie el siguiente formulario para poder suscribirse al fondo {fondo.nombre}</p>
                    <form className="p-4 border rounded mt-10 shadow-md" onSubmit={aceptarAccion}>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Nombres:</label>
                            <input type="text" name="nombres"  className="w-full p-2 border rounded" required />
                        </div>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Apellidos:</label>
                            <input type="text" name="apellidos"  className="w-full p-2 border rounded" required />
                        </div>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Cédula:</label>
                            <input type="text" name="cedula"  className="w-full p-2 border rounded" required />
                        </div>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Email:</label>
                            <input type="email" name="email"  className="w-full p-2 border rounded" required />
                        </div>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Telefono:</label>
                            <input type="tel" name="telefono"  className="w-full p-2 border rounded" required />
                        </div>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Notificación:</label>
                            <select name="notificacion" value={formData.notificacion} onChange={handleChange}  className="w-full p-2 border rounded" required>
                                <option value="email">Email</option>
                                <option value="telefono">Teléfono</option>
                            </select>
                        </div>
                        <div className="flex justify-evenly items-center" >
                            <label className="p-5">Monto:</label>
                            <input type="number" name="monto"  min={fondo.monto_minimo} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="flex justify-end mt-5" >
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 mx-3 rounded">Aceptar</button>
                            <button type="button" onClick={cancelarAccion} className="bg-red-500 text-white py-2 px-4 rounded">Cancelar</button>
                        </div>
                    </form>
                </main>
            <Footer />
        </div>
    )
}

export default SuscribeFund