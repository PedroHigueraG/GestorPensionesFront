import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header'
import Footer from '../components/footer'
import FundCard from '../components/fundCard';
import {useNavigate} from 'react-router-dom';


function Funds() {
    const [fondos, setFondos] = useState([]);
    const [fondosSuscritos, setFondosSuscritos] = useState([]);
    const [fondosDisponibles, setFondosDisponibles] = useState([]);
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();
    

    const getData = async () => {

        try {
            const userResponse = await axios.get('http://127.0.0.1:8000/users/1000066664');
            setUsuario(userResponse.data)

            const fundsResponse = await axios.get('http://127.0.0.1:8000/funds');
            setFondos(fundsResponse.data);

            filterFunds(userResponse.data,fundsResponse.data)
            

        }catch(error){
            console.error('Error al obtener los datos:', error);
        }
    };

    const filterFunds = (userData, fundsData) => {

        const suscribedFunds = fundsData.filter(fondo => userData.fondos_actuales.some(fondoActual => fondoActual.IdFondo === fondo.id))
        const availableFunds = fundsData.filter(fondo => !userData.fondos_actuales.some(fondoActual => fondoActual.IdFondo === fondo.id))
        setFondosSuscritos(suscribedFunds)
        setFondosDisponibles(availableFunds)
    }

    useEffect(() => {
        getData()
    }, []);

    const suscript = (fondo, usuario) => {
        navigate('/funds/suscribe', { state: { fondo, usuario } });
    };

    const unsuscript = async (fondoPresente, usuario) => {

        const currentFund = usuario.fondos_actuales.filter(fondo => fondo.IdFondo === fondoPresente.id)
        const remainingFunds = usuario.fondos_actuales.filter(fondo => fondo.IdFondo !== fondoPresente.id)
        const fechaActual = new Date().toLocaleDateString('es-CO');

        const usuarioActualizado = {
            saldo: parseFloat(usuario.saldo) + parseFloat(currentFund[0].Monto),
            fondos_actuales: remainingFunds
        } 

        const transaccionActual = {
            id: Date.now()+usuario.cedula,
            tipo: 'Cierre',
            monto: currentFund[0].Monto,
            fecha_transaccion: fechaActual,
            idFondo: fondoPresente.id,
            idUsuario: usuario.cedula
        }

        const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar esta acción?');
        if (confirmCancel) {
            try {
                await axios.put(`http://127.0.0.1:8000/users/${usuario.cedula}`, usuarioActualizado); 
                await axios.post('http://127.0.0.1:8000/transactions', transaccionActual); 
                alert('Retiro exitoso');
                window.location.reload();
            } catch(error){
                console.error('Error al suscribirse al fondo:', error);
            }
        }
    };


  return (
    <div className="h-screen">
        <Header />
        <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 mt-4">Gestor de fondos</h2>
        <a href="./" className="text-blue-500 hover:underline cursor-pointer">Volver</a>
        <h2 className="text-2xl font-bold mb-4 mt-4">Tus fondos</h2>
        <div className="p-4">
            {fondosSuscritos.map(fondo => (<FundCard key={fondo.id} fondo={fondo} usuario={usuario} suscribirse={'Retirarse'} accionBoton={unsuscript}/>))}
        </div>
        <h2 className="text-2xl font-bold mb-4 mt-4">Fondos disponibles</h2>
        <div className="p-4">
            {fondosDisponibles.map(fondo => (<FundCard key={fondo.id} fondo={fondo} usuario={usuario} suscribirse={'Suscribirse'} accionBoton={suscript}/>))}
        </div>
        </main>
        <Footer />
    </div>
    
  );
}

export default Funds;