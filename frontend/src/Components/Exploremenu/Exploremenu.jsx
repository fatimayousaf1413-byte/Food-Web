import React from 'react'
import './Explorestyle.css'
import {menu_list} from '../../assets/assets'

const Exploremenu = ({catagory, setcatagory}) => {
  return (
    <div className="exploremenu" id='exploremenu'>
        <h1>Explore Our Menu</h1>
        <p className='exploremenu-text'>Choose from a menu featuring a delectable array of dishes.Our mission is to satisfy your cravings and elevate your dining experience.One meal at a time.</p>
        <div className="exploremenu-list">
            {menu_list.map((item, index)=>{
                return (
                    <div onClick={()=>setcatagory(prev=>prev===item.menu_name ? 'All' : item.menu_name)} key={index} className="exploremenu-listitems">
                        <img className={catagory===item.menu_name? 'active' : ''} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default Exploremenu