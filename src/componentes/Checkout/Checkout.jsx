import { useState, useContext } from "react"
import {CarritoContext} from "../../context/CarritoContext" 
import { db } from "../../services/config"
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"

const Checkout = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [emailConfirmacion, setEmailConfirmacion] = useState("")
    const [error, setError] = useState("")
    const [ordenId, setOrdenId] = useState("")

    const {carrito, vaciarCarrito, total} = useContext(CarritoContext)

    const manejadorFormulario =(e) => {
        e.preventDefault()

        if(!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor completa todos los campos.")
            return;
        }
        
    
        if(email !== emailConfirmacion){
            setError("Los campos del email no coinciden.")
            return;
        }

        const orden = {
            items: carrito.map (producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        };

        Promise.all(
            orden.items.map(async (productoOrden) =>{
                const productoRef = doc(db, "productos", productoOrden.id)
                const productoDoc = await getDoc(productoRef)
                const stockActual = productoDoc.data().stock

                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad
                })
            })
        )
        .then(()=>{
        addDoc(collection(db, "ordenes"), orden)
            .then(docRef => {
                setOrdenId(docRef.id)
                vaciarCarrito();
                setNombre("")
                setApellido("")
                setTelefono("")
                setEmail("")
                setEmailConfirmacion("")
            })
            .catch(error => {
                setError("Se producto un error al crear la orden!")
            })
        })
        .catch((error) => {
            setError("No se puede actualziar el stock, intente mas tarde!")
        })
    }

  return (
    <div class="menuCheckout">
        <h2> Checkout:</h2>

        <form onSubmit={manejadorFormulario}>
            {   
                carrito.map(producto => (
                    <div key={producto.item.id}>
                        <p>{producto.item.nombre}</p>
                        <p>${producto.item.precio} x {producto.cantidad}</p>
                        <p>${producto.item.precio * producto.cantidad}</p>
                    </div>
                ))
            }
            <div>
                 <label htmlFor=""> Nombre </label><br />
                 <input type="text" onChange={(e)=>setNombre(e.target.value)} value={nombre} />                
            </div>
            <div>
                <label htmlFor=""> Apellido </label> <br />
                <input type="text" onChange={(e)=>setApellido(e.target.value)} value={apellido} /> 
            </div>
            <div>
            <label htmlFor=""> Telefono </label> <br />
            <input type="text" onChange={(e)=>setTelefono(e.target.value)} value={telefono} /> 
            </div>
            <div>
            <label htmlFor=""> Email </label> <br />
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </div>
            <div>
            <label htmlFor=""> Email Confirmacion </label> <br />
            <input type="email" onChange={(e)=>setEmailConfirmacion(e.target.value)} value={emailConfirmacion}/>
            
            </div>
                {
                    error && <p style={{color:"red"}}> {error}</p>
                }
            <br />
            <button type="submit"> Confirmar Compra </button>
            {
                ordenId && (
                    <strong>¡Gracias por tu compra! Tu numero de orden es: {ordenId}</strong>
                )
            }
        </form>
        
    </div>

  )
}

export default Checkout

