import './App.css'
import Navbar from "./components/Navbar.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Venta from './pages/Venta.jsx';
import Cambio from './pages/Cambio.jsx';
import Inventario from './pages/Inventario.jsx';
import Transacciones from './pages/Transacciones.jsx';


function App() {
    return (

        <div className="App">
            <Router>
                <Navbar/>
                <Routes>
                    <Route path ="/" element={<Venta/>}/>
                    <Route path ="/cambio" element={<Cambio/>}/>
                    <Route path ="/inventario" element={<Inventario/>}/>
                    <Route path ="/transacciones" element={<Transacciones/>}/>
                </Routes>
            </Router>
        </div>

    );
}

export default App
