import { useEffect, useState, useContext } from "react";
import { Dock } from "react-dock";
import ProdutoCart from "../produto-cart/produto-cart.jsx";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart-context.jsx";

function Cart() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { cartItems, totalCart } = useContext(CartContext);

  // Abre o sidebar ao disparar o evento 'openSidebar'
  useEffect(() => {
    const handleOpenSidebar = () => setShow(true);
    window.addEventListener("openSidebar", handleOpenSidebar);

    // Limpeza do event listener ao desmontar o componente
    return () => window.removeEventListener("openSidebar", handleOpenSidebar);
  }, []);

  const checkout = () => navigate("/checkout");

  return (
    <Dock
      position="right"
      isVisible={show}
      fluid={false}
      size={420}
      onVisibleChange={(visible) => setShow(visible)}
    >
      <div className="cart-header text-center">
        <h1>Meu Pedido</h1>
       {/* <button
          className="close-cart"
          onClick={() => setShow(false)}
          aria-label="Fechar carrinho"
        >
          ×
        </button> */}

      </div>

      <div className="lista-produtos">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ProdutoCart
              key={item.id}
              id={item.id}
              foto={item.foto}
              nome={item.nome}
              qtd={item.qtd}
              preco={item.preco}
            />
          ))
        ) : (
          <p className="carrinho-vazio">Seu carrinho está vazio.</p>
        )}
      </div>

      {cartItems && cartItems.length > 0 && (
        <div className="footer-cart">
          <div className="footer-cart-valor">
            <span>Total</span>
            <span>
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalCart)}
              </strong>
            </span>
          </div>
          <div>
            <button
              onClick={checkout}
              className="btn-checkout"
              aria-label="Finalizar pedido"
            >
              Finalizar pedido
            </button>
          </div>
        </div>
      )}
    </Dock>
  );
}

export default Cart;
