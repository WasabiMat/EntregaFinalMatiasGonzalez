import { useContext } from "react"
import './Cart.css' ;
import { CarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"


const Cart = () => {
 const {carrito, total, cantidadTotal, vaciarCarrito} = useContext(CarritoContext)

 if (cantidadTotal === 0) {
    return (
        <>
            <div class="menuCheckout">
                <h2>No hay productos en el carrito.</h2>
                <Link to="/">Ver Productos</Link>
            </div>
        </>

    )
 }

  return (
    <div class="menuCheckout">
        {
            carrito.map(producto => <CartItem key={producto.item.id} {...producto}/>)
        }

        <h3>Total: ${total}</h3>
        <h3>Cantidad Total: {cantidadTotal}</h3>
        <button onClick={()=> vaciarCarrito()}> Vaciar Carrito </button>
        <br/>
        <Link to="/checkout">Finalizar Compra</Link>

    </div>
  )
}

export default Cart