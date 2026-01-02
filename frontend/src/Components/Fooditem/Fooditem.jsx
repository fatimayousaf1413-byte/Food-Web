import { useContext } from 'react'
import './Fooditemstyle.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../Context/Storecontext'

const Fooditem = ({ id, name, price, description, image }) => {
    const { cartitems, addTocart, removeTocart } = useContext(Storecontext)

    return (
        <div className="fooditem">
            <div className="fooditem-image-container">
                <img src={`http://localhost:3000/uploads/${image}`} alt="" className='fooditem-image' />
                {!cartitems[id] ?
                    <img className='add' onClick={() => addTocart(id)} src={assets.add_icon_white} alt="" /> :
                    <div className="fooditem-counter">
                        <img onClick={() => removeTocart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartitems[id]}</p>
                        <img onClick={() => addTocart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="fooditem-info">
                <div className="fooditem-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="fooditem-description">
                    {description}
                </p>
                <p className='fooditem-price'>
                    ${price}
                </p>
            </div>
        </div>
    )
}

export default Fooditem