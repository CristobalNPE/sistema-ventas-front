import React from 'react';
import '../styles/Navbar.css';
import {Link} from 'react-router-dom';
import SellIcon from '@mui/icons-material/Sell';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Logo from '../assets/Logo.png';
import Profile from '../assets/profile.jpg'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={Logo} alt="Logo"/>
            </div>
            <ul className="navbar__items">
                <li>
                    <Link to="/">
                        <SellIcon/>
                        Venta</Link>
                </li>
                <li>
                    <Link to="/cambio">
                        <ChangeCircleIcon/>
                        Cambio</Link>
                </li>
                <li>
                    <Link to="/inventario">
                        <InventoryIcon/>
                        Inventario</Link>
                </li>
                <li>
                    <Link to="/transacciones">
                        <ReceiptIcon/>
                        Transacciones</Link>
                </li>
            </ul>
            <div className="navbar__user-info">
                <img className="user-info__photo" src={Profile} alt="Profile Photo"/>
                <div className="user-info">
                    <h5>Nombre Usuario</h5>
                    <h5>Perfil Vendedor</h5>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
