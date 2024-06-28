import { BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from './pages/Homepage'
import SuscribeFund from './pages/SuscribeFund'
import Funds from './pages/Funds'
import Transactions from './pages/Transactions'
import Notifications from './pages/Notifications'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Homepage/>}/>
      <Route path="/funds" element = {<Funds/>}/>
      <Route path="/funds/suscribe" element = {<SuscribeFund/>}/>
      <Route path="/transactions" element = {<Transactions/>}/>
      <Route path="/notifications" element = {<Notifications/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App