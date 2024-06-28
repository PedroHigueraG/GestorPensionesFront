import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header'
import Footer from '../components/footer'

function Transactions() {
    const [transacciones, setTransacciones] = useState([]);
    const [fondos, setFondos] = useState({});

    const getData = async () => {
        try {
            const transactionResponse = await axios.get('http://127.0.0.1:8000/transactions');
            setTransacciones(transactionResponse.data)

            const fundsResponse = await axios.get('http://127.0.0.1:8000/funds');
            const fundsData = fundsResponse.data.reduce((acc, fund) => {
                acc[fund.id] = fund.nombre;
                return acc;
            }, {});
            setFondos(fundsData);
            //setFondos(fundsResponse.data);            

        }catch(error){
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
    <div className="h-screen">
      <Header />
      <main className="flex-grow p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 mt-4">Historial de transacciones</h2>
      <a href="./" className="text-blue-500 hover:underline cursor-pointer">Volver</a>
      <div className="p-4">
        {transacciones.map(transaccion => (
            <div key={transaccion.id} className={`flex justify-between p-6 rounded-lg shadow-md mb-4 ${transaccion.tipo === 'Apertura' ? 'bg-green-100' : 'bg-red-100'}`}>
                <div>
                    <h3 className="text-l font-semibold mb-2">{transaccion.tipo} de {fondos[transaccion.idFondo]}</h3>
                    <p className="text-gray-400 mb-2 ">{transaccion.fecha_transaccion}</p>
                </div>
                <div>
                    <span className='mb-2 font-semibold ml-10'>${transaccion.monto.toLocaleString()}</span>
                </div>
            </div>
        ))}
      </div>
      </main>
      <Footer />
    </div>
    
  );
}

export default Transactions;
