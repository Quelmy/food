import { useEffect, useState, useContext } from "react";
import { Dock } from "react-dock";
import ProdutoCart from "../produto-cart/produto-cart.jsx";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart-context.jsx";

function Cart() {
  const [show, setShow] = useState(false);
  const [dockSize, setDockSize] = useState(0.3); // 30% da tela
  const navigate = useNavigate();
  const { cartItems, totalCart } = useContext(CartContext);

  // Abre o Cart quando o evento é disparado
  useEffect(() => {
    const handleOpenSidebar = () => setShow(true);
    window.addEventListener("openSidebar", handleOpenSidebar);

    return () => window.removeEventListener("openSidebar", handleOpenSidebar);
  }, []);

  // Atualiza o tamanho do dock para telas pequenas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setDockSize(0.9); // 90% da tela em mobile
      } else {
        setDockSize(0.3); // 30% da tela em desktop
      }
    };

    handleResize(); // roda ao montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkout = () => navigate("/checkout");

  return (
    <Dock
      position="right"
      isVisible={show}
      fluid={true}          // largura em % da tela
      size={dockSize}       // tamanho responsivo
      onVisibleChange={setShow}
      dimMode="none"        // sem overlay nem botão de fechar
    >
      <div className="cart-container">
        <div className="cart-header text-center">
          <h1>Meu Pedido</h1>
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
      </div>
    </Dock>
  );
}

export default Cart;
