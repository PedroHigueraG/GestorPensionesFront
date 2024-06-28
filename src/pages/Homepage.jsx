import Header from '../components/header'
import Footer from '../components/footer'

function Homepage() {
    return (
    <div className="flex flex-col h-screen">
    <Header/>

      {/* Body */}
      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="text-center w-3/4 p-10">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a la plataforma de gestión de fondos de BTG Pactual</h2>
            <p className="">En esta plataforma podrá participar en diferentes opciones de inversión como lo son los fondos de inversión colectiva, 
            fondos de pensión voluntaria, entre otros más. Para conocer las herramientas disponibles puedes navegar a través del siguiente menú.</p>
        </div>
        <nav>
          <ul className="list-none text-center">
            <li className="mb-2"><a href="./funds" className="text-blue-500 hover:underline cursor-pointer">Administrar fondos</a></li>
            <li className="mb-2"><a href="./transactions" className="text-blue-500 hover:underline cursor-pointer">Historial de transacciones</a></li>
            <li className="mb-2"><a href="./notifications" className="text-blue-500 hover:underline cursor-pointer">Gestor de notificaciones</a></li>
          </ul>
        </nav>
      </main>
    
    <Footer/>
    </div>
    )
}

export default Homepage