import React from 'react'
import "./Sidebar.css"
import add from "../../assets/add.svg"
import list from "../../assets/list.svg"
import order from "../../assets/orders.svg"
import { NavLink } from 'react-router'

const Sidebar = () => {
  return (
    <div className='sidebar' >
      <div className="sidebar-options">
        <NavLink to={"/add"} className="sidebar-option">
          <img src={add} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to={"/list"} className="sidebar-option">
          <img src={list} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to={"/order"} className="sidebar-option">
          <img src={order} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar