import "./navbar.css"
import logo from "../../assets/logo.png";
import bag from "../../assets/bag.png";
import Cart from "../cart/cart.jsx";
import {Link} from "react-router-dom";
function Navbar(props){

        function openSidebar(){
            const event = new CustomEvent('openSidebar');
            window.dispatchEvent(event);
        }


    return <div className="navbar">
        <Link to="/">
        <img src={logo} className="logotipo" alt="logotipo" />

        </Link>
        
        {
            props.showMenu ?

                <div className="menu">
                <Link to="/historico">Historico</Link>
                <button onClick={openSidebar} className="btn btn-red">
                    <img src={bag} className="icon" />
                    Sacola
                </button>
            </div>
        :null
        }

        
        <Cart />
    </div>
}

export default Navbar;