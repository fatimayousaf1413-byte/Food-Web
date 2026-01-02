import React, { useContext } from 'react'
import './Fooddisplystyle.css'
import { Storecontext } from '../../Context/Storecontext'
import Fooditem from '../Fooditem/Fooditem'

const Fooddisplay = ({ catagory }) => {
  const { food_list } = useContext(Storecontext)

  return (
    <div className="fooddisplay" id='fooddisplay'>
      <h2>Top dishes near you</h2>
      <div className="fooddisplay-list">
        {food_list.map((item, index) => {
          if (catagory === "All" || catagory == item.category) {
            return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default Fooddisplay