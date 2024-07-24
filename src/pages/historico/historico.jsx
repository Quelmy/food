import Navbar from "../../components/navbar/navbar.jsx";
import "./historico.css";
import {pedidos} from "../../dados.js";

function Historico(){


    
    return <>
        <Navbar showMenu={true} />
        
        <div className="container">

            <div className="titulo text-center">
                <h1>Historico de Pedidos</h1>
            </div>

            <div className="box-pedido">
                <table className="table">
                    {
                        pedidos.map(function(ped){
                            return <tr key={ped.id_pedido}>
                                        <td><strong>Pedido {ped.id_pedido}</strong></td>
                                        <td className="text-light">{ped.dt}</td>
                                        <td className="text-red">{new Intl.NumberFormat('pt-BR', 
                                            {style: 'currency', currency: "BRL"}).format(ped.total)}</td>
                                    </tr>
                        })
                      
                    }
                    

                </table>
            </div>
        </div>

        
    </>
}

export default Historico;