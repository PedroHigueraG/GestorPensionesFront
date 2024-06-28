const FundCard = ({fondo, usuario, suscribirse,accionBoton}) =>(

    <div key={fondo.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h3 className="text-l font-semibold mb-4">{fondo.nombre}</h3>
        <p className='mb-2'>{fondo.descripcion}</p>
        <p className="text-gray-700 mb-2">Categoría: {fondo.categoria}</p>
        <p className="text-gray-700 mb-2">Monto mínimo: ${fondo.monto_minimo.toLocaleString()}</p>
        <button 
        className={`mt-2 text-white py-1 px-4 rounded  ${suscribirse === "Suscribirse" ? 'bg-green-500' : 'bg-red-500'}`}
        onClick={() => accionBoton(fondo,usuario)}>{suscribirse}</button>
    </div>
)


export default FundCard