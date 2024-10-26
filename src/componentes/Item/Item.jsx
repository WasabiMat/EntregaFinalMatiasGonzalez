import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({id, nombre, precio, img, stock}) => {
  return (
    <div className='cardProducto'>
        <img src={img} alt={nombre} />
        <h3>{nombre} </h3>
        <p>${precio}ARS </p>
        <p>Disponible: {stock}</p>
        <Link to={`/item/${id}`}><span>Ver Detalles</span></Link>
    </div>
  )
}

export default Item