import "./navbar.css";
import logo from "../../assets/logo.png";
import bag from "../../assets/bag.png";
import Cart from "../cart/cart.jsx";
import { Link } from "react-router-dom";

function Navbar({ showMenu }) {

    const openSidebar = () => {
        const event = new CustomEvent('openSidebar');
        window.dispatchEvent(event);
    };

    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} className="logotipo" alt="Logotipo" />
            </Link>

            {showMenu && (
                <div className="menu">
                    <Link to="/historico">Histórico</Link>
                    <button onClick={openSidebar} className="btn btn-red" aria-label="Abrir carrinho">
                        <img src={bag} className="icon" alt="Ícone da sacola" />
                        Sacola
                    </button>
                </div>
            )}

            <Cart />
        </div>
    );
}

export default Navbar;
